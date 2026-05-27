import { useEffect, useState } from "react";

/**
 * Fetch the latest published release tag for a GitHub repo. Returns the tag
 * string (e.g., "v0.7.10-beta", "v3.17.0") or null if the repo has no
 * releases yet, the fetch fails, or the API rate-limits the visitor.
 *
 * Cards opt in by calling this with their `{ owner, repo }`. When the repo
 * publishes a new release, the next page load picks it up automatically —
 * no portfolio commit needed to bump version chips. Repos that don't
 * publish releases just render no version (graceful no-op).
 *
 * Rate limit context: GitHub's unauthenticated API allows 60 requests per
 * hour per visitor IP. With ~5 version-bearing cards on the page, every
 * visitor uses 5 of their 60/hour budget — comfortable headroom.
 */
export default function useGitHubLatestRelease(owner, repo) {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    if (!owner || !repo) return;
    let cancelled = false;

    fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        if (d && typeof d.tag_name === "string") setVersion(d.tag_name);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [owner, repo]);

  return version;
}
