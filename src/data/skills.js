/**
 * Curated creative / live-show / broadcast skill set.
 *
 * These are pro tools that GitHub language tags can't surface — the
 * differentiator for a "developer with deep live-events chops" portfolio.
 * Grouped by domain rather than flattened so each competency reads clearly.
 *
 * `level` is intentionally an empty placeholder on every entry for now —
 * Jason sets these himself on review. A skill renders a level pill ONLY when
 * `level` is a non-empty string, so empty entries make NO proficiency claim.
 * Allowed values (free-form, but keep to this ladder): "Expert" | "Advanced" |
 * "Proficient" | "Familiar".
 *
 * @typedef {Object} Skill
 * @property {string} name  Display name of the tool.
 * @property {string} level Proficiency label, or "" to omit the pill.
 *
 * @typedef {Object} SkillGroup
 * @property {string} domain  Section heading for the group.
 * @property {Skill[]} skills Tools within the domain.
 */

/** @type {SkillGroup[]} */
export const skillGroups = [
  {
    domain: "Media Servers",
    skills: [
      { name: "Millumin", level: "" },
      { name: "Watchout", level: "" },
      { name: "Pixera", level: "" },
      { name: "Mitti", level: "" },
      { name: "Q-Lab", level: "" },
      { name: "Disguise", level: "" },
    ],
  },
  {
    domain: "Screen Switchers",
    skills: [
      { name: "Barco E2 / E3", level: "" },
      { name: "Analog Way Ascender", level: "" },
      { name: "Analog Way Aquilon", level: "" },
      { name: "Spyder X20", level: "" },
    ],
  },
  {
    domain: "Broadcast / Signal Flow / IT",
    skills: [
      { name: "SMPTE-2110", level: "" },
      { name: "Dante", level: "" },
      { name: "Fiber Optics", level: "" },
      { name: "IP Networking", level: "" },
      { name: "Switching & Routing", level: "" },
      { name: "Cisco Systems", level: "" },
    ],
  },
  {
    domain: "Editing / Post",
    skills: [
      { name: "Adobe Premiere Pro", level: "" },
      { name: "Adobe After Effects", level: "" },
    ],
  },
  {
    domain: "Design",
    skills: [
      { name: "Adobe Photoshop", level: "" },
      { name: "Adobe Illustrator", level: "" },
    ],
  },
  {
    domain: "Audio",
    skills: [
      { name: "Pro Tools", level: "" },
      { name: "Live Mixing", level: "" },
    ],
  },
];
