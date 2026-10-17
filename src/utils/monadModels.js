/**
 * Normalizes a single model entry from Monad-1 telemetry so missing optional
 * fields (`precision`, `role`, `size`) degrade gracefully.
 *
 * @param {object|string} entry - Raw model object or legacy model name string.
 * @param {boolean} resident - Whether the model is currently resident in VRAM.
 * @returns {{ name: string, size?: string, precision?: string, role?: string, resident: boolean }|null}
 */
export function normalizeMonadModel(entry, resident) {
  if (!entry) return null;
  if (typeof entry === "string") {
    const trimmed = entry.trim();
    return trimmed ? { name: trimmed, resident: Boolean(resident) } : null;
  }
  if (typeof entry === "object" && typeof entry.name === "string" && entry.name.trim()) {
    const normalized = {
      name: entry.name.trim(),
      resident: Boolean(resident),
    };
    if (typeof entry.precision === "string" && entry.precision.trim()) {
      normalized.precision = entry.precision.trim();
    }
    if (typeof entry.role === "string" && entry.role.trim()) {
      normalized.role = entry.role.trim();
    }
    if (typeof entry.size === "string" && entry.size.trim()) {
      normalized.size = entry.size.trim();
    }
    return normalized;
  }
  return null;
}

/**
 * Partitions Monad-1 telemetry models into two grouped sections:
 * - `residentModels`: models currently loaded in VRAM (`Resident now (N)`)
 * - `installedModels`: cold models installed on disk (`Also installed (N)`)
 *
 * Contract handling (three fallback layers):
 * 1. `availableModels[]` (preferred) — uses explicit boolean `resident` flag,
 *    or synthesizes residency from `currentModels` membership if omitted.
 * 2. `currentModels[]` (legacy fallback when `availableModels` is absent) —
 *    all entries treated as resident.
 * 3. `currentModel` (oldest singular fallback) — wrapped as a single resident model.
 *
 * @param {object|null|undefined} monadStats - Raw `monad-stats.json` payload.
 * @returns {{
 *   residentModels: Array<{ name: string, size?: string, precision?: string, role?: string, resident: boolean }>,
 *   installedModels: Array<{ name: string, size?: string, precision?: string, role?: string, resident: boolean }>,
 *   totalModels: number,
 *   residentEmptyText: string,
 *   installedEmptyText: string
 * }}
 */
export function partitionMonadModels(monadStats) {
  const rawCurrent = Array.isArray(monadStats?.currentModels)
    ? monadStats.currentModels
    : monadStats?.currentModel
      ? [monadStats.currentModel]
      : [];

  const currentNames = new Set(
    rawCurrent
      .map((m) => (typeof m === "string" ? m : m?.name))
      .filter((n) => typeof n === "string" && n.trim())
      .map((n) => n.trim()),
  );

  const hasAvailableArray = Array.isArray(monadStats?.availableModels);
  let normalizedList = [];

  if (hasAvailableArray) {
    normalizedList = monadStats.availableModels
      .map((m) => {
        const isResident =
          typeof m?.resident === "boolean"
            ? m.resident
            : typeof m?.name === "string" && currentNames.has(m.name.trim());
        return normalizeMonadModel(m, isResident);
      })
      .filter(Boolean);
  } else {
    normalizedList = rawCurrent
      .map((m) => normalizeMonadModel(m, true))
      .filter(Boolean);
  }

  const residentModels = normalizedList.filter((m) => m.resident);
  const installedModels = normalizedList.filter((m) => !m.resident);

  return {
    residentModels,
    installedModels,
    totalModels: normalizedList.length,
    residentEmptyText: "— none, models load on first request —",
    installedEmptyText: "— none —",
  };
}
