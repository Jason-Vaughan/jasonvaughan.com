import React, { useState } from "react";

/**
 * Small "Copy link" button that puts a deep link to the parent card on the
 * clipboard. Pair with an `id` on the card's root element and the deep-link
 * scroll-and-pulse handler in App.jsx — clicking the resulting link drops
 * the visitor straight onto that card with a brief accent-color glow.
 *
 * @param {Object} props
 * @param {string} props.id Target element id (also the deep-link hash).
 * @param {Object} [props.style] Extra inline styles merged onto the button.
 * @param {"share"|"hash"} [props.mode="share"] "share" copies the OG-tagged
 *   `/share/<id>/` stub URL (rich social preview); "hash" copies the clean
 *   `/#<id>` deep link — used for category/section headers that have no stub.
 * @param {boolean} [props.compact=false] Icon-only (no "Copy link" label),
 *   for tight spots like dropdown headers.
 * @param {string} [props.label="Copy link"] Text shown when not compact.
 */
export default function ShareLink({ id, style, mode = "share", compact = false, label = "Copy link" }) {
  const [copied, setCopied] = useState(false);

  const flashCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Legacy clipboard path for insecure contexts (plain-HTTP LAN / tailnet),
  // where navigator.clipboard is unavailable. Uses a throwaway textarea +
  // execCommand("copy"), which still works without a secure origin.
  const legacyCopy = (text) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // "share" → /share/<id>/ OG-tagged stub (rich preview, JS-redirects to
    // /#<id>); "hash" → clean /#<id> deep link for sections without a stub.
    const url =
      mode === "hash"
        ? `${window.location.origin}/#${id}`
        : `${window.location.origin}/share/${id}/`;
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(flashCopied, () => {
        if (legacyCopy(url)) flashCopied();
      });
    } else if (legacyCopy(url)) {
      flashCopied();
    } else {
      // Last resort: at least put the deep link in the address bar.
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={copied ? "Link copied!" : "Copy direct link"}
      aria-label={copied ? "Link copied" : "Copy direct link"}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        color: copied ? "#10b981" : "#71717a",
        cursor: "pointer",
        padding: "4px 9px",
        fontSize: 11,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "inherit",
        transition: "color 0.15s, border-color 0.15s",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "#a1a1aa";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
      }}
      onMouseLeave={(e) => {
        if (copied) return;
        e.currentTarget.style.color = "#71717a";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      }}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {compact ? null : "Copied"}
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          {compact ? null : label}
        </>
      )}
    </button>
  );
}
