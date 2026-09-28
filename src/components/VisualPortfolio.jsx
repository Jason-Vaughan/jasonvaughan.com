import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio-index.json";

export default function VisualPortfolio() {
  const [activeTab, setActiveTab] = useState("photography"); // 'photography', 'digitalArt', 'presentations'
  
  // Default to first category
  const [activeCategory, setActiveCategory] = useState(() => {
    return Object.keys(portfolioData.photography)[0] || "";
  });

  const [lightboxIndex, setLightboxIndex] = useState(null);

  // When changing tabs, reset category to the first one in that tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "photography") {
      setActiveCategory(Object.keys(portfolioData.photography)[0] || "");
    } else if (tab === "digitalArt") {
      setActiveCategory(Object.keys(portfolioData.digitalArt)[0] || "");
    } else {
      setActiveCategory("");
    }
  };

  const categories = useMemo(() => {
    if (activeTab === "photography") return Object.keys(portfolioData.photography).sort();
    if (activeTab === "digitalArt") return Object.keys(portfolioData.digitalArt).sort();
    return [];
  }, [activeTab]);

  const currentImages = useMemo(() => {
    if (activeTab === "photography") return portfolioData.photography[activeCategory] || [];
    if (activeTab === "digitalArt") return portfolioData.digitalArt[activeCategory] || [];
    return [];
  }, [activeTab, activeCategory]);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % currentImages.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const tabStyle = (isActive) => ({
    padding: "8px 16px",
    background: isActive ? "rgba(251, 191, 36, 0.15)" : "transparent",
    border: `1px solid ${isActive ? "rgba(251, 191, 36, 0.4)" : "transparent"}`,
    color: isActive ? "#fbbf24" : "#a1a1aa",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s"
  });

  return (
    <div style={{ width: "100%" }}>
      {/* Top Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button style={tabStyle(activeTab === "photography")} onClick={() => handleTabChange("photography")}>Photography</button>
        <button style={tabStyle(activeTab === "digitalArt")} onClick={() => handleTabChange("digitalArt")}>Digital Art</button>
        <button style={tabStyle(activeTab === "presentations")} onClick={() => handleTabChange("presentations")}>Presentations</button>
      </div>

      {activeTab === "presentations" ? (
        <div style={{ textAlign: "center", padding: "64px 0", color: "#a1a1aa", border: "1px dashed #52525b", borderRadius: 12 }}>
          <p>Presentation graphics are currently being curated.</p>
          <p style={{ fontSize: 13, marginTop: 8 }}>Check back soon.</p>
        </div>
      ) : (
        <>
          {/* Category Selector */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              style={{
                background: "#18181b",
                color: "#e4e4e7",
                border: "1px solid #3f3f46",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                outline: "none",
                cursor: "pointer"
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
            {currentImages.map((img, idx) => {
              const src = activeTab === "photography" ? img.thumb : img.original;
              return (
                <motion.div 
                  key={img.filename}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                  onClick={() => openLightbox(idx)}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 12,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#18181b",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
                  }}
                >
                  <img 
                    src={src} 
                    alt={img.filename} 
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.9)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24
            }}
          >
            <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img 
                src={activeTab === "photography" ? (currentImages[lightboxIndex].large || currentImages[lightboxIndex].medium) : currentImages[lightboxIndex].original} 
                alt="Enlarged"
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.8)"
                }}
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Controls */}
              {currentImages.length > 1 && (
                <>
                  <button onClick={prevImage} style={{ position: "absolute", left: -40, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", padding: 10 }}>‹</button>
                  <button onClick={nextImage} style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 32, cursor: "pointer", padding: 10 }}>›</button>
                </>
              )}
              <button onClick={closeLightbox} style={{ position: "absolute", top: -40, right: -40, background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer", padding: 10 }}>✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
