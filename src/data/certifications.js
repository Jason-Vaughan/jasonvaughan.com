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
    name: "7-Year IATSE Stagehand Apprenticeship & Journeyperson",
    issuer: "IATSE Local 16",
    year: "",
    detail:
      "Journeyperson member in good standing — stagecraft, video production, rigging, AV infrastructure & live operations.",
  },
  {
    name: "Barco Video Engineering & High-Resolution Screen Switching",
    issuer: "Barco",
    year: "",
    detail: "Certified operator & engineer for E2, ImagePro, and multi-destination screen switching systems.",
  },
  {
    name: "Analog Way High-Resolution Switching & Video Engineering",
    issuer: "Analog Way",
    year: "",
    detail: "High-resolution switching, multi-screen blends, and signal routing.",
  },
  {
    name: "Millumin & Disguise Media Server Systems",
    issuer: "Millumin · Disguise · Dataton",
    year: "",
    detail: "Media playback, projection mapping, Watchout winches, and live show control integration.",
  },
  {
    name: "Dante & AV-over-IP Signal Flow Networking",
    issuer: "Audinate · SMPTE-2110",
    year: "",
    detail: "Dante audio networking, NDI/SDI routing, and fiber-optic signal distribution.",
  },
  { name: "OSHA 30", issuer: "OSHA", year: "", detail: "General Industry & Staging Safety Certification." },
  {
    name: "Google Project Management Professional Certificate",
    issuer: "Google · Coursera",
    year: "2026",
    detail:
      "7-course professional program — project life cycle, Agile/Scrum, risk, budgeting, and stakeholder management.",
    link: "/Google_Management_Certificate.pdf",
    thumbnail: "/images/google_management_certificate_thumb.png",
  },
  {
    name: "Introduction to Python",
    issuer: "Coursera · Freedom Learning Group",
    year: "2025",
    detail: "Project-based learning credential for Python programming fundamentals.",
    link: "/Coursera_Intro_To_Python.pdf",
    thumbnail: "/images/coursera_intro_to_python_thumb.png",
  },
  {
    name: "Instructor — Production Technology",
    issuer: "IATSE Local 16 Training Trust Fund",
    year: "",
    detail:
      "Selected to teach current-generation show technology — networking, video engineering, and media systems — to fellow members.",
  },
];
