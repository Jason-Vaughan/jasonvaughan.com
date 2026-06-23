/**
 * Curated certifications — the "experience-credentialed" proof set.
 *
 * Deliberately a SHORT, current list, not an exhaustive résumé dump. Stale
 * certs (15-20 yr old Microsoft / Cisco / Citrix) are intentionally omitted —
 * they age the holder instead of crediting him. No anchor year is shown in the
 * section copy (avoids age-math); evergreen certs render date-free, and only a
 * recent, currency-signaling year (e.g. Google PM 2026) is surfaced.
 *
 * `year` is a string: "" means render no year (evergreen / undated), a value
 * like "2026" renders a year chip to signal "still leveling up."
 *
 * `detail` is an optional muted sub-line ("" = none) — used to carry the
 * breadth of the apprenticeship and the instructor role's currency signal.
 * Note the IATSE items are framed as *training/credentials* (apprenticeship,
 * instructor), named factually like an institution — never as union advocacy.
 *
 * @typedef {Object} Certification
 * @property {string} name   The certification name.
 * @property {string} issuer Issuing body (Barco, OSHA, Google, ...).
 * @property {string} year   Year earned, or "" to omit the chip.
 * @property {string} [detail] Optional muted sub-line, or "" for none.
 *
 * @type {Certification[]}
 */
export const certifications = [
  {
    name: "Stagecraft Apprenticeship — 7-Year",
    issuer: "IATSE Local 16",
    year: "",
    detail:
      "Trained hands-on across the stagecraft trades — rigging, carpentry, audio, video, and live show management.",
  },
  { name: "Video Engineering — Level A", issuer: "Barco", year: "", detail: "" },
  { name: "OSHA 30", issuer: "OSHA", year: "", detail: "" },
  {
    name: "Project Management — Professional Certificate",
    issuer: "Google · Coursera",
    year: "2026",
    detail:
      "7-course professional program — project life cycle, Agile/Scrum, risk, budgeting, and stakeholder management.",
  },
  {
    name: "Instructor — Production Technology",
    issuer: "IATSE Local 16 Training Trust Fund",
    year: "",
    detail:
      "Selected to teach current-generation show technology — networking, video engineering, and media systems — to fellow members.",
  },
];
