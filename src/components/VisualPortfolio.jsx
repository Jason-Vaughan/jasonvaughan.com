import React, { useState, useEffect, useMemo } from "react";
import portfolioData from "../data/portfolio-index.json";
import { motion, AnimatePresence } from "framer-motion";

export default function VisualPortfolio() {
  const [activeTab, setActiveTab] = useState("photography");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [viewMode, setViewMode] = useState("slideshow"); // "slideshow" | "categories" | "grid"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // When tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFeaturedIndex(0);
    setViewMode("slideshow");
    setSelectedCategory(null);
  };

  // Build the massive shuffled array for the slideshow
  const allImagesInTab = useMemo(() => {
    let images = [];
    const source = activeTab === "photography" ? portfolioData.photography : portfolioData.digitalArt;
    if (source) {
      Object.keys(source).forEach(cat => {
        images = images.concat(source[cat]);
      });
    }

    // Deduplicate
    const uniqueImages = [];
    const seen = new Set();
    images.forEach(img => {
      if (!seen.has(img.filename)) {
        seen.add(img.filename);
        uniqueImages.push(img);
      }
    });

    // Fisher-Yates shuffle
    for (let i = uniqueImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueImages[i], uniqueImages[j]] = [uniqueImages[j], uniqueImages[i]];
    }
    return uniqueImages;
  }, [activeTab]);

  // Determine which images are "active" for rendering the grid / lightbox
  const currentCategoryImages = useMemo(() => {
    if (selectedCategory) {
      const source = activeTab === "photography" ? portfolioData.photography : portfolioData.digitalArt;
      return source[selectedCategory] || [];
    }
    return [];
  }, [activeTab, selectedCategory]);

  // Randomize category cover photos once per mount
  const categoryCovers = useMemo(() => {
    const covers = {};
    const tabs = ["photography", "digitalArt"];
    tabs.forEach(tab => {
      const source = portfolioData[tab];
      if (source) {
        Object.keys(source).forEach(cat => {
          if (source[cat] && source[cat].length > 0) {
            const randomIndex = Math.floor(Math.random() * source[cat].length);
            covers[`${tab}_${cat}`] = source[cat][randomIndex];
          }
        });
      }
    });
    return covers;
  }, []);

  const activeLightboxImages = viewMode === "grid" ? currentCategoryImages : allImagesInTab;

  // Slideshow rotation
  useEffect(() => {
    if (viewMode !== "slideshow" || activeTab === "presentations") return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % allImagesInTab.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [allImagesInTab.length, viewMode, activeTab]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
  };
  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % activeLightboxImages.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + activeLightboxImages.length) % activeLightboxImages.length);
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
          {/* VIEW: SLIDESHOW */}
          {viewMode === "slideshow" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {allImagesInTab.length > 0 && (
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
                    <motion.div
                      key={featuredIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <div style={{ position: "relative", maxWidth: "100%", maxHeight: "100%", display: "flex", borderRadius: 16, overflow: "hidden" }}>
                        <motion.img
                          src={activeTab === "photography" ? allImagesInTab[featuredIndex].large : allImagesInTab[featuredIndex].original}
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.03 }}
                          transition={{ scale: { duration: 6, ease: "linear" } }}
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                        {activeTab === "digitalArt" && (
                           <div style={{ position: "absolute", bottom: 0, right: 0, background: "#111", color: "rgba(255,255,255,0.7)", padding: "6px 12px", fontSize: 13, fontWeight: 500, borderTopLeftRadius: 8, zIndex: 10 }}>
                             © Jason Vaughan
                           </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <button 
                  onClick={() => setViewMode("categories")}
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
                  Browse by Category
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW: CATEGORIES */}
          {viewMode === "categories" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, color: "#fff", fontWeight: 700 }}>Browse Categories</h3>
                <button onClick={() => setViewMode("slideshow")} style={{ color: "#fbbf24", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>← Back to Slideshow</button>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24 }}>
                {Object.keys(activeTab === "photography" ? portfolioData.photography : portfolioData.digitalArt).map((cat) => {
                  const catImages = (activeTab === "photography" ? portfolioData.photography : portfolioData.digitalArt)[cat];
                  if (!catImages || catImages.length === 0) return null;
                  const randomCover = categoryCovers[`${activeTab === "photography" ? "photography" : "digitalArt"}_${cat}`] || catImages[0];
                  const coverImg = activeTab === "photography" ? randomCover.large : randomCover.original;
                  return (
                    <motion.div 
                      key={cat}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => {
                         setSelectedCategory(cat);
                         setViewMode("grid");
                      }}
                      style={{ cursor: "pointer", position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", boxShadow: "0 4px 12px rgba(0,0,0,0.5)", border: "1px solid #27272a" }}
                    >
                       <img src={coverImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={cat} />
                       <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", padding: "32px 16px 16px" }}>
                         <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{cat}</span>
                         <span style={{ color: "#a1a1aa", fontSize: 13, display: "block", marginTop: 4 }}>{catImages.length} images</span>
                       </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* VIEW: CATEGORY GRID */}
          {viewMode === "grid" && selectedCategory && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontSize: 24, color: "#fff", fontWeight: 800 }}>{selectedCategory}</h3>
                <button onClick={() => setViewMode("categories")} style={{ color: "#fbbf24", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}>← Back to Categories</button>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {currentCategoryImages.map((img, idx) => {
                  const src = activeTab === "photography" ? img.large : img.original;
                  return (
                    <motion.div 
                      key={img.filename + idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: (idx % 10) * 0.02 }}
                      onClick={() => openLightbox(idx)}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: 12,
                        overflow: "hidden",
                        cursor: "pointer",
                        background: "#18181b",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        border: "1px solid #27272a"
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
                      {activeTab === "digitalArt" && (
                         <div style={{ position: "absolute", bottom: 0, right: 0, background: "#111", color: "rgba(255,255,255,0.7)", padding: "4px 8px", fontSize: 10, fontWeight: 500, borderTopLeftRadius: 6, zIndex: 10, pointerEvents: "none" }}>
                           © Jason Vaughan
                         </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && activeLightboxImages[lightboxIndex] && (
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
              <div style={{ position: "relative", maxWidth: "100%", maxHeight: "100%", display: "flex", borderRadius: 8, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.8)" }}>
                <img 
                  src={activeTab === "photography" ? activeLightboxImages[lightboxIndex].large : activeLightboxImages[lightboxIndex].original} 
                  alt="Enlarged"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "90vh",
                    objectFit: "contain"
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                {activeTab === "digitalArt" && (
                   <div style={{ position: "absolute", bottom: 0, right: 0, background: "#111", color: "rgba(255,255,255,0.7)", padding: "8px 16px", fontSize: 14, fontWeight: 500, borderTopLeftRadius: 8, zIndex: 10, pointerEvents: "none" }}>
                     © Jason Vaughan
                   </div>
                )}
              </div>
              {activeLightboxImages.length > 1 && (
                <>
                  <button onClick={prevImage} style={{ position: "absolute", left: -60, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", padding: 10 }}>‹</button>
                  <button onClick={nextImage} style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", padding: 10 }}>›</button>
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
