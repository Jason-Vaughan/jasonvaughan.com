#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const STATS_FILE = resolve(PROJECT_ROOT, "public/git-stats.json");

async function main() {
  console.log("Fetching live repo forks and stars from GitHub API...");
  try {
    const rawRepos = execSync(
      "gh api users/Jason-Vaughan/repos --paginate --jq '.[] | {name: .name, forks: .forks_count, stars: .stargazers_count}'",
      { encoding: "utf8" }
    );

    const repoLines = rawRepos.trim().split("\n").filter(Boolean);
    let totalForks = 0;
    let totalStars = 0;
    const repoBreakdown = {};

    for (const line of repoLines) {
      try {
        const item = JSON.parse(line);
        totalForks += item.forks || 0;
        totalStars += item.stars || 0;
        repoBreakdown[item.name] = {
          forks: item.forks || 0,
          stars: item.stars || 0
        };
      } catch (_) {}
    }

    console.log(`✓ Fetched ${repoLines.length} repos: Total Forks = ${totalForks}, Total Stars = ${totalStars}`);

    let existingData = {};
    try {
      existingData = JSON.parse(readFileSync(STATS_FILE, "utf8"));
    } catch (_) {}

    const updatedData = {
      ...existingData,
      totalForks,
      totalStars,
      repoBreakdown,
      updatedAt: new Date().toISOString()
    };

    writeFileSync(STATS_FILE, JSON.stringify(updatedData, null, 2));
    console.log(`✅ Updated ${STATS_FILE} with forks (${totalForks}) and stars (${totalStars}).`);
  } catch (err) {
    console.error("Failed to query GitHub API:", err.message);
  }
}

main();
