import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeMonadModel, partitionMonadModels } from "./monadModels";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

describe("partitionMonadModels (Issue #45)", () => {
  it("groups both models in 'Resident now' and 0 in 'Also installed' when all are resident", () => {
    const result = partitionMonadModels({
      availableModels: [
        { name: "Qwen2.5 14B", size: "17 GB", precision: "Q4_K_M", role: "chat", resident: true },
        { name: "Qwen2.5-Coder 32B", size: "75 GB", precision: "FP16", role: "code", resident: true },
      ],
    });

    expect(result.totalModels).toBe(2);
    expect(result.residentModels).toHaveLength(2);
    expect(result.installedModels).toHaveLength(0);
    expect(result.installedEmptyText).toBe("— none —");
  });

  it("splits models between 'Resident now' and 'Also installed' when one is cold", () => {
    const result = partitionMonadModels({
      availableModels: [
        { name: "Llama 3.3 70B", size: "42 GB", precision: "Q4", role: "chat", resident: false },
        { name: "Qwen2.5-Coder 32B", size: "75 GB", precision: "FP16", role: "code", resident: true },
      ],
    });

    expect(result.totalModels).toBe(2);
    expect(result.residentModels).toEqual([
      { name: "Qwen2.5-Coder 32B", size: "75 GB", precision: "FP16", role: "code", resident: true },
    ]);
    expect(result.installedModels).toEqual([
      { name: "Llama 3.3 70B", size: "42 GB", precision: "Q4", role: "chat", resident: false },
    ]);
  });

  it("places all models in 'Also installed' and provides helper text when nothing is resident", () => {
    const result = partitionMonadModels({
      availableModels: [
        { name: "Qwen2.5 14B", size: "9 GB", precision: "Q4_K_M", role: "chat", resident: false },
        { name: "Qwen2.5-Coder 32B", size: "19 GB", precision: "Q4_K_M", role: "code", resident: false },
      ],
    });

    expect(result.totalModels).toBe(2);
    expect(result.residentModels).toHaveLength(0);
    expect(result.installedModels).toHaveLength(2);
    expect(result.residentEmptyText).toBe("— none, models load on first request —");
  });

  it("handles unknown models without precision or role gracefully", () => {
    const normalized = normalizeMonadModel({ name: "Custom-Experimental-7B", size: "4.5 GB" }, false);
    expect(normalized).toEqual({
      name: "Custom-Experimental-7B",
      size: "4.5 GB",
      resident: false,
    });
    expect("precision" in normalized).toBe(false);
    expect("role" in normalized).toBe(false);
  });

  it("degrades gracefully with totalModels = 0 when availableModels is empty or daemon is down", () => {
    expect(partitionMonadModels({ availableModels: [] }).totalModels).toBe(0);
    expect(partitionMonadModels(null).totalModels).toBe(0);
    expect(partitionMonadModels(undefined).totalModels).toBe(0);
  });

  it("falls back to legacy currentModels / currentModel when availableModels is absent", () => {
    const fromCurrentModels = partitionMonadModels({
      currentModels: [{ name: "Qwen2.5 14B", precision: "Q4_K_M", role: "chat" }],
    });
    expect(fromCurrentModels.residentModels).toHaveLength(1);
    expect(fromCurrentModels.installedModels).toHaveLength(0);

    const fromSingular = partitionMonadModels({
      currentModel: "Qwen2.5 14B",
    });
    expect(fromSingular.residentModels).toEqual([{ name: "Qwen2.5 14B", resident: true }]);
  });

  it("wires two grouped sections ('Resident now' and 'Also installed') into Infrastructure.jsx", () => {
    const src = readFileSync(join(ROOT, "src/components/Infrastructure.jsx"), "utf8");
    expect(src).toContain("Resident now ({residentModels.length})");
    expect(src).toContain("Also installed ({installedModels.length})");
  });
});
