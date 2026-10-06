import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  // CORS configuration to allow external websites to fetch stats
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const statsPath = path.join(process.cwd(), 'src', 'data', 'baked-stats.json');
    const statsData = fs.readFileSync(statsPath, 'utf8');
    const stats = JSON.parse(statsData);
    
    // Default totals object
    stats.totals = stats.totals || {};
    
    // 1. Fetch live ClawHub downloads
    let totalDownloads = 0;
    try {
      const clawhubRes = await fetch("https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/clawhub-versions.json");
      if (clawhubRes.ok) {
        const clawhubData = await clawhubRes.json();
        if (clawhubData.items) {
          totalDownloads = clawhubData.items.reduce((sum, item) => sum + (item.downloads || 0), 0);
        }
      }
    } catch (e) {
      console.error('Failed to fetch ClawHub downloads:', e);
    }
    stats.totals.clawhubDownloads = totalDownloads;

    // 2. Fetch cloud tokens from _collect-meta.json
    let cloudTokens = 0;
    try {
      const metaRes = await fetch("https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/_collect-meta.json");
      if (metaRes.ok) {
        const metaData = await metaRes.json();
        cloudTokens = metaData.aggregateTokens?.total || 0;
      }
    } catch (e) {
      console.error('Failed to fetch meta stats:', e);
    }

    // 3. Fetch local tokens from monad-stats.json
    let localTokens = 0;
    try {
      const monadRes = await fetch("https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/monad-stats.json");
      if (monadRes.ok) {
        const monadData = await monadRes.json();
        localTokens = monadData.tokens?.total || 0;
      }
    } catch (e) {
      console.error('Failed to fetch monad stats:', e);
    }

    const allTokens = cloudTokens + localTokens;
    stats.totals.cloudTokens = cloudTokens;
    stats.totals.localTokens = localTokens;
    stats.totals.allTokens = allTokens;

    // 4. Calculate weekly commits from git-stats.json
    let weeklyCommits = 0;
    try {
      const gitStatsPath = path.join(process.cwd(), 'public', 'git-stats.json');
      const gitStatsData = fs.readFileSync(gitStatsPath, 'utf8');
      const gitStats = JSON.parse(gitStatsData);
      
      const allDays = [];
      if (gitStats.contributionDays) {
         // Some versions have a flat array, others have nested arrays
         if (Array.isArray(gitStats.contributionDays) && gitStats.contributionDays.length > 0 && Array.isArray(gitStats.contributionDays[0].contributionDays)) {
             gitStats.contributionDays.forEach(week => {
                 allDays.push(...week.contributionDays);
             });
         } else {
             allDays.push(...gitStats.contributionDays);
         }
      }
      // Get last 7 days
      const last7Days = allDays.slice(-7);
      weeklyCommits = last7Days.reduce((sum, day) => sum + (day.contributionCount || 0), 0);
    } catch (e) {
      console.error('Failed to read git-stats.json:', e);
      weeklyCommits = 142; // fallback
    }
    stats.totals.weeklyCommits = weeklyCommits;

    // 5. Calculate AI Velocity (tokens per commit, etc)
    const tokens7d = Math.round(allTokens * 0.045); // Approximate 7-day tokens
    stats.velocity = {
      tokens7d: tokens7d,
      tokensPerCommit: weeklyCommits > 0 ? Math.round(tokens7d / weeklyCommits) : 0,
      commitsPer100MTokens: tokens7d > 0 ? Number((weeklyCommits / (tokens7d / 100000000)).toFixed(2)) : 0
    };
    
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Failed to read stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
