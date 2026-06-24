/**
 * Tiny registry that lets collapsible sections be opened by id from a single
 * coordinator (the deep-link / jump-nav handler in App.jsx).
 *
 * Each <Collapsible> registers an `open` callback under its id on mount and
 * unregisters on unmount. When a deep-link (`#skills`) or a future section-nav
 * link targets that id, the handler calls `openSection(id)` to expand it BEFORE
 * scrolling + flashing — so the section is open by the time the eye lands.
 *
 * Module-level singleton Map: there is exactly one section list per page.
 */

/** @type {Map<string, () => void>} */
const openers = new Map();

/**
 * Register a section's open callback under its id.
 * @param {string} id Section id (matches the element id and deep-link hash).
 * @param {() => void} open Callback that expands the section.
 * @returns {void}
 */
export function registerSection(id, open) {
  openers.set(id, open);
}

/**
 * Remove a section's registration (call on unmount).
 * @param {string} id Section id.
 * @returns {void}
 */
export function unregisterSection(id) {
  openers.delete(id);
}

/**
 * Open the registered section with this id, if any. Safe to call for ids that
 * aren't collapsible (no-op) — non-collapsible deep-link targets just scroll.
 * @param {string} id Section id.
 * @returns {boolean} True if a collapsible was found and opened.
 */
export function openSection(id) {
  const open = openers.get(id);
  if (open) {
    open();
    return true;
  }
  return false;
}

/**
 * Test/cleanup helper — clears all registrations.
 * @returns {void}
 */
export function __resetSectionRegistry() {
  openers.clear();
}
