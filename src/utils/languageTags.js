// Languages too noisy or implementation-detail to render as tags.
const NOISE_LANGS = new Set([
  "CSS", "HTML", "Shell", "Mako", "Dockerfile", "SCSS", "Roff",
  "Procfile", "Makefile",
]);

// If the curated tags already mention a more-specific language, skip the
// less-specific one. e.g., when "TypeScript" is curated, don't also show
// "JavaScript" — TS supersets JS in the public-facing context.
const SUBSUMED_BY = {
  JavaScript: ["TypeScript", "Node.js"],
};

/**
 * Compute extra tag labels from a stats object's `languages` array (as
 * produced by the centralized collector) that should be appended to the
 * card's curated tags. De-dupes against the curated set and filters
 * noise / redundant entries.
 *
 * @param {Array<{name: string, percent: number}>|undefined} languages
 * @param {Array<string>} curatedTags - existing tag labels on the card
 * @returns {Array<string>} additional tag labels to render
 */
export function autoLanguageTags(languages, curatedTags = []) {
  if (!Array.isArray(languages)) return [];

  const curatedLower = new Set(curatedTags.map((t) => t.toLowerCase()));
  const detectedNames = new Set(languages.map((l) => l.name));

  return languages
    .filter((l) => !NOISE_LANGS.has(l.name))
    .filter((l) => !curatedLower.has(l.name.toLowerCase()))
    .filter((l) => {
      const subsumers = SUBSUMED_BY[l.name] || [];
      return !subsumers.some(
        (s) => curatedLower.has(s.toLowerCase()) || detectedNames.has(s),
      );
    })
    .map((l) => l.name);
}
