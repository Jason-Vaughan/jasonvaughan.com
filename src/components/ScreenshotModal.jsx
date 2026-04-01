import React, { useState, useEffect, useCallback } from "react";

/**
 * Lightbox modal for scrolling through project screenshots.
 * Left/right arrows or swipe to navigate, click backdrop or X to close.
 */
export default function ScreenshotModal({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);

  useEffect(() => {
    /** @param {KeyboardEvent} e */
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  const overlay = {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.85)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 24,
  };

  const closeBtn = {
    position: "absolute", top: 16, right: 20,
    background: "none", border: "none", color: "#a1a1aa",
    fontSize: 28, cursor: "pointer", lineHeight: 1,
  };

  const navBtn = (side) => ({
    position: "absolute", top: "50%", [side]: 16,
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10, color: "#fafafa",
    fontSize: 24, width: 44, height: 44,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  });

  const counter = {
    position: "absolute", bottom: 20,
    left: "50%", transform: "translateX(-50%)",
    color: "#71717a", fontSize: 13, fontWeight: 600,
  };

  const caption = {
    position: "absolute", bottom: 44,
    left: "50%", transform: "translateX(-50%)",
    color: "#d4d4d8", fontSize: 14, fontWeight: 500,
    whiteSpace: "nowrap",
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div
        style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].alt || "Screenshot"}
          style={{
            maxWidth: "90vw", maxHeight: "80vh",
            objectFit: "contain", borderRadius: 12,
            border: "1px solid #3f3f46",
          }}
        />
      </div>

      <button style={closeBtn} onClick={onClose}>×</button>

      {images.length > 1 && (
        <>
          <button style={navBtn("left")} onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          <button style={navBtn("right")} onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
        </>
      )}

      {images[index].alt && <div style={caption}>{images[index].alt}</div>}
      <div style={counter}>{index + 1} / {images.length}</div>
    </div>
  );
}
