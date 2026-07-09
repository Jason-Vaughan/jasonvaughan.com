/**
 * Tiny registry that lets collapsible sections be opened or closed by id
 * from a single coordinator (the deep-link handler or visitor mode switch).
 */

/** @type {Map<string, { open: () => void, close: () => void }>} */
const registry = new Map();

/**
 * Register a section's open and close callbacks.
 * @param {string} id Section id.
 * @param {() => void} open Callback to expand.
 * @param {() => void} close Callback to collapse.
 */
export function registerSection(id, open, close) {
  registry.set(id, { open, close });
}

/**
 * Remove registration.
 */
export function unregisterSection(id) {
  registry.delete(id);
}

/**
 * Expand a registered section.
 */
export function openSection(id) {
  const cell = registry.get(id);
  if (cell) {
    cell.open();
    return true;
  }
  return false;
}

/**
 * Collapse a registered section.
 */
export function closeSection(id) {
  const cell = registry.get(id);
  if (cell) {
    cell.close();
    return true;
  }
  return false;
}

/**
 * Collapse all registered sections.
 */
export function closeAllSections() {
  registry.forEach((cell) => {
    cell.close();
  });
}

export function __resetSectionRegistry() {
  registry.clear();
}
