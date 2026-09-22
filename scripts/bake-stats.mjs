import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function formatBigNumber(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B+`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 100_000) return `${Math.floor(n / 1000)}K+`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}K+`;
  return n.toLocaleString();
}

const projectsToFetch = {
  tilt: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tilt-stats.json",
  tangleclaw: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tangleclaw-stats.json",
  tanglebrain: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/tanglebrain-stats.json",
  cierre_sensei: "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/cierre-sensei-stats.json"
};

async function main() {
  const baked = {};

  for (const [key, url] of Object.entries(projectsToFetch)) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}`);
      const data = await res.json();
      
      baked[key] = {
        loc: data.loc ? formatBigNumber(data.loc) : undefined,
        tests: data.tests ? formatBigNumber(data.tests) : undefined,
        commits: data.commits ? formatBigNumber(data.commits) : undefined,
        endpoints: data.endpoints ? data.endpoints.toLocaleString() : undefined,
        rules: data.rules ? data.rules.toLocaleString() : undefined,
        engines: data.engines ? data.engines.toLocaleString() : undefined,
        npmDeps: data.npmDeps !== undefined ? data.npmDeps.toLocaleString() : undefined,
        backends: data.backends ? data.backends.toLocaleString() : undefined,
        states: data.states ? data.states.toLocaleString() : undefined,
        plans: data.plans ? data.plans.toLocaleString() : undefined,
      };
    } catch (e) {
      console.warn(`Could not bake stats for ${key}:`, e.message);
    }
  }

  const outPath = resolve(__dirname, "../src/data/baked-stats.json");
  writeFileSync(outPath, JSON.stringify(baked, null, 2), "utf8");
  console.log(`Baked stats saved to ${outPath}`);
}

main().catch(console.error);
