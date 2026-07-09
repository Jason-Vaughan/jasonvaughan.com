import { useEffect, useState } from "react";
import ShareLink from "./ShareLink";
import { registerSection, unregisterSection } from "../utils/sectionRegistry";

/**
 * Reusable collapsible section wrapper in the site's dark style. Renders a
 * `<section id data-collapsible>` (the stable scroll/flash target) with a
 * clickable header that toggles the body open/closed. Registers an open
 * callback in the section registry so deep-links / jump-nav can expand it.
 *
 * Body content stays MOUNTED while collapsed and is hidden with CSS (an
 * animated `grid-template-rows` 0fr→1fr). This is deliberate: deep-links can
 * target cards *inside* a section (e.g. `#notse` in the Projects grid), so
 * those elements must exist in the DOM even while the section is closed. The
 * deep-link handler in App.jsx walks up from the target via the
 * `[data-collapsible]` marker, opens the enclosing section, then scrolls +
 * flashes the specific target. (Always-mounted also matches the original
 * pre-collapse page, so there's no perf regression.)
 *
 * @param {Object} props
 * @param {string} props.id Section id — matches the deep-link hash.
 * @param {string} props.title Header label.
 * @param {string} [props.icon] Optional emoji shown left of the title for a bit
 *   of visual character.
 * @param {string} [props.description] Short one-line descriptor shown under the
 *   title (open or closed) so visitors know what's inside before expanding.
 * @param {boolean} [props.defaultOpen=false] Whether it starts expanded.
 * @param {boolean} [props.bodyInWrap=false] Constrain the body to the 960px
 *   content wrap. Use for pure-body sections (Skills/Certs) that don't bring
 *   their own width-wrapper; leave false when wrapping an existing section
 *   component that already wraps its own content.
 * @param {boolean} [props.provideId=bodyInWrap] Whether the wrapper renders the
 *   DOM `id` (it's the scroll target). Defaults to `bodyInWrap`. Set true when
 *   wrapping a component that does NOT render its own `id={id}` (e.g. Pipeline),
 *   so the deep-link target exists; leave false (the default) for components
 *   that already render their own matching id — avoids duplicate DOM ids.
 * @param {React.ReactNode} props.children Section body.
 * @returns {JSX.Element} The collapsible section.
 */
export default function Collapsible({ id, title, icon, description, statPill, defaultOpen = false, bodyInWrap = false, provideId = bodyInWrap, highlighted = false, children }) {
  const [open, setOpen] = useState(defaultOpen);

  // Register an opener so the deep-link / jump-nav coordinator can expand this
  // section by id before it scrolls + flashes.
  useEffect(() => {
    registerSection(id, () => setOpen(true), () => setOpen(false));
    return () => unregisterSection(id);
  }, [id]);

  // If the page loads already pointed at this section, start open so the
  // initial deep-link scroll lands on expanded content.
  useEffect(() => {
    if (window.location.hash.slice(1) === id) setOpen(true);
  }, [id]);

  const section = { background: "transparent", color: "#fafafa", padding: "16px 0" };
  const wrap = { maxWidth: 960, margin: "0 auto", padding: "0 24px" };
  // Header is a flex ROW (not a single button) so the section's own
  // copy-link button can sit beside the toggle without nesting <button>s.
  const headerRow = {
    display: "flex", alignItems: "center", gap: 10,
    borderBottom: open ? "1px solid rgba(63,63,70,.6)" : "1px solid transparent",
    transition: "border-color .2s ease",
  };
  const headerBtn = {
    flex: 1, minWidth: 0,
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
    background: "transparent", border: "none", cursor: "pointer",
    padding: "12px 0", textAlign: "left", color: "inherit",
  };
  const h2Style = { fontSize: 28, fontWeight: 800, letterSpacing: -0.5, margin: 0 };
  const iconStyle = { flexShrink: 0, fontSize: 26, lineHeight: 1, marginRight: 14 };
  const titleBlock = { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 };
  const descStyle = { margin: 0, fontSize: 14, color: "#a1a1aa", fontWeight: 400, lineHeight: 1.4 };
  const chevron = {
    flexShrink: 0, width: 22, height: 22, color: "#71717a",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform .25s ease",
  };
  // Animated collapse that keeps children in the DOM: the outer grid animates
  // its single row from 0fr (closed) to 1fr (open); the inner cell clips.
  const collapseOuter = {
    display: "grid",
    gridTemplateRows: open ? "1fr" : "0fr",
    transition: "grid-template-rows .28s ease",
  };
  const collapseInner = { minHeight: 0, overflow: "hidden" };

  // Avoid duplicate DOM ids: when wrapping an existing section component that
  // already renders its own `id={id}`, DON'T also put that id on the wrapper —
  // the section id stays unique on the inner element. The section id always
  // rides in `data-collapsible` so the deep-link handler can resolve which
  // dropdown to open regardless of where the id element lives. When the inner
  // content has no id (Skills/Certs/Pipeline), `provideId` makes the wrapper
  // carry the id so the deep-link target still exists.
  return (
    <section data-collapsible={id} {...(provideId ? { id } : {})} style={section}>
      <div style={wrap}>
        <div style={headerRow} data-collapsible-header="">

          <button
             type="button"
             style={headerBtn}
             aria-expanded={open}
             aria-controls={`${id}-body`}
             onClick={() => setOpen((v) => !v)}
           >
            {icon ? <span style={iconStyle} aria-hidden="true">{icon}</span> : null}
            <span style={titleBlock}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={h2Style}>{title}</h2>
                {statPill && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 9999,
                    background: "rgba(56, 189, 248, 0.10)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    color: "#38bdf8",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}>
                    {statPill}
                  </span>
                )}
                {highlighted && (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    padding: "2px 6px",
                    borderRadius: 4,
                    background: "rgba(251, 191, 36, 0.1)",
                    border: "1px solid rgba(251, 191, 36, 0.35)",
                    color: "#fbbf24",
                    fontFamily: "inherit",
                  }}>
                    Highly Relevant
                  </span>
                )}
              </span>
              {description ? <p style={descStyle}>{description}</p> : null}
            </span>
            <svg style={chevron} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {/* Section-level deep link (clean /#id) — share the whole category. */}
          <ShareLink id={id} mode="hash" compact label="Copy section link" />
        </div>
      </div>

      <div id={`${id}-body`} style={collapseOuter} aria-hidden={!open} inert={!open}>
        <div style={collapseInner}>
          {bodyInWrap ? (
            <div style={{ ...wrap, paddingTop: 16 }}>{children}</div>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
}
