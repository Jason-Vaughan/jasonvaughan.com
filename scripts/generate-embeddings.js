import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const dataPath = path.join(__dirname, '../public/chat-context.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  const chunks = [];

  // Bio
  for (const [key, value] of Object.entries(data.bio)) {
    chunks.push({ type: 'bio', id: key, text: `Bio - ${key}: ${value}` });
  }

  // Projects
  for (const [key, value] of Object.entries(data.projects)) {
    chunks.push({ type: 'project', id: key, text: `Project ${value.name}: ${value.spark || value.description}` });
  }

  // Career
  data.career.forEach((c, idx) => {
    chunks.push({ type: 'career', id: idx.toString(), text: `Career at ${c.company} as ${c.role} (${c.period}): ${c.details}` });
  });

  // Anecdotes
  data.anecdotes.forEach(a => {
    chunks.push({ type: 'anecdote', id: a.id, text: `Q: ${a.question}\nA: ${a.story}` });
  });

  console.log(`Generating embeddings for ${chunks.length} chunks...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const response = await ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: chunk.text,
      });
      chunk.embedding = response.embeddings[0].values;
      console.log(`✅ Embedded ${chunk.type} - ${chunk.id}`);
    } catch (err) {
      console.error(`❌ Failed to embed ${chunk.type} - ${chunk.id}:`, err);
    }
    // Rate limiting pause
    await new Promise(res => setTimeout(res, 300));
  }

  const outDir = path.join(__dirname, '../content');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  fs.writeFileSync(path.join(outDir, 'embeddings.json'), JSON.stringify(chunks, null, 2));
  console.log('Successfully saved to content/embeddings.json');
}

main().catch(console.error);
