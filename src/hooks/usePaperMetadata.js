import { useEffect, useState } from "react";

const ASSETS_BASE =
  "https://raw.githubusercontent.com/Jason-Vaughan/project-assets/main/content/papers";

/**
 * Format an ISO date string ("2026-05-22") as "May 22, 2026".
 * Used to display lastRevised values from the meta.json sidecar.
 */
export function formatPaperDate(iso) {
  if (typeof iso !== "string") return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  return `${months[month - 1]} ${day}, ${year}`;
}

/**
 * Fetch paper metadata from
 *   project-assets/content/papers/<slug>.meta.json
 * and return `{ metadata, loading, error }`. WhitePapers (and any future
 * paper-source session) self-publishes the sidecar; the portfolio only
 * needs the slug.
 *
 * Falls back to the supplied `fallback` object when the fetch fails,
 * returns invalid JSON, or is missing required keys. The fallback is
 * also returned synchronously during the initial render so the UI
 * never flashes empty placeholders.
 */
export default function usePaperMetadata(slug, fallback) {
  const [state, setState] = useState({
    metadata: fallback,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    const url = `${ASSETS_BASE}/${slug}.meta.json`;

    fetch(url, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((meta) => {
        if (cancelled) return;
        if (!meta || typeof meta.title !== "string" || typeof meta.version !== "string") {
          throw new Error("missing required keys");
        }
        setState({ metadata: meta, loading: false, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        // eslint-disable-next-line no-console
        console.warn(
          `[usePaperMetadata] ${slug}: meta.json fetch failed (${err.message}), using fallback`,
        );
        setState({ metadata: fallback, loading: false, error: err });
      });

    return () => {
      cancelled = true;
    };
    // fallback is treated as static per-paper config; intentionally not in deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return state;
}
