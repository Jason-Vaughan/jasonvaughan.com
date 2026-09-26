import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages array' });
    }

    // Combine last 2 user messages to preserve conversation topic context
    const userMessages = messages.filter(m => m.role === 'user').slice(-2).map(m => m.content);
    const retrievalQuery = userMessages.join('\n');

    // Load embeddings database
    const embeddingsPath = path.join(process.cwd(), 'content', 'embeddings.json');
    let db = [];
    if (fs.existsSync(embeddingsPath)) {
      db = JSON.parse(fs.readFileSync(embeddingsPath, 'utf8'));
    }

    let contextText = '';
    if (db.length > 0 && retrievalQuery.trim()) {
      // Embed the user's query
      const embedResponse = await ai.models.embedContent({
        model: 'text-embedding-004',
        contents: retrievalQuery,
      });
      const queryVec = embedResponse.embeddings[0].values;

      // Compute Cosine Similarity
      const results = db.map(item => ({
        ...item,
        score: cosineSimilarity(queryVec, item.embedding)
      })).filter(item => item.score > 0.5).sort((a, b) => b.score - a.score);

      const topResults = results.slice(0, 5);
      contextText = topResults.map(item => item.text).join('\n\n');
    }

    const systemPrompt = `You are Jason Vaughan's AI portfolio assistant. Your job is to represent Jason and answer questions based on the provided context.
If the context does not contain the answer, say so politely. Be concise and professional.

CONTEXT:
${contextText}
`;

    const formattedMessages = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedMessages,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
