import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio-index.json";

export default function VisualPortfolio() {
  const [activeTab, setActiveTab] = useState("photography");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isGridExpanded, setIsGridExpanded] = useState(false);

  // Flatten images for the active tab
  const currentImages = useMemo(() => {
    let images = [];
    if (activeTab === "photography") {
      Object.keys(portfolioData.photography).forEach(cat => {
        images = images.concat(portfolioData.photography[cat]);
      });
    } else if (activeTab === "digitalArt") {
      Object.keys(portfolioData.digitalArt).forEach(cat => {
        images = images.concat(portfolioData.digitalArt[cat]);
      });
    }
    // Simple deterministic shuffle so it looks mixed
    return images.sort((a, b) => (a.filename > b.filename ? 1 : -1));
  }, [activeTab]);

  // Rotate featured image every 5 seconds
  useEffect(() => {
    if (currentImages.length === 0) return;
    const interval = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % currentImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImages]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFeaturedIndex(0);
    setIsGridExpanded(false);
  };

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
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
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
          {/* Featured Image Hero */}
          {currentImages.length > 0 && (
            <div 
              style={{ 
                width: "calc(100vw - 40px)", 
                maxWidth: 1200,
                marginLeft: "50%",
                transform: "translateX(-50%)",
                aspectRatio: "16 / 9",
                background: "#000",
                marginBottom: 24, 
                borderRadius: 16, 
                overflow: "hidden", 
                position: "relative",
                cursor: "pointer",
                border: "1px solid #3f3f46",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
              }}
              onClick={() => openLightbox(featuredIndex)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={featuredIndex}
                  src={activeTab === "photography" ? currentImages[featuredIndex].large : currentImages[featuredIndex].original}
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.03 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 1.5 },
                    scale: { duration: 6, ease: "linear" }
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </AnimatePresence>
            </div>
          )}

          {/* Grid Drawer Toggle */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <button 
              onClick={() => setIsGridExpanded(!isGridExpanded)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px dashed rgba(255, 255, 255, 0.2)",
                color: "#a1a1aa",
                padding: "12px 24px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.color = "#a1a1aa"; }}
            >
              {isGridExpanded ? "Close Thumbnail Grid" : `View All ${currentImages.length} Thumbnails`}
            </button>
          </div>

          <AnimatePresence>
            {isGridExpanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                {/* Grid */}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {currentImages.map((img, idx) => {
              const src = activeTab === "photography" ? img.medium : img.original;
              return (
                <motion.div 
                  key={img.filename + idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (idx % 20) * 0.02 }}
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
              </motion.div>
            )}
          </AnimatePresence>
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
