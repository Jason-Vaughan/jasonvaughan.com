import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function InfrastructureModal({ isOpen, onClose, model }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keep the previous model in state so we can animate it out when it closes
  const [displayModel, setDisplayModel] = React.useState(model);
  useEffect(() => {
    if (model) setDisplayModel(model);
  }, [model]);

  // Prevent double-fire or phantom click closures immediately after opening
  const [canClose, setCanClose] = React.useState(false);
  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      const timer = setTimeout(() => setCanClose(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (canClose) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && displayModel && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24, pointerEvents: "none"
        }}>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)", pointerEvents: "auto"
            }}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#18181b", border: "1px solid #3f3f46", borderRadius: 16,
              width: "100%", maxWidth: 500, pointerEvents: "auto",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              overflow: "hidden", display: "flex", flexDirection: "column",
              maxHeight: "90vh"
            }}
          >
            {/* Header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#fafafa", letterSpacing: -0.3 }}>
                  {displayModel.name}
                </h3>
                <div style={{ marginTop: 6, fontSize: 13, color: "#a1a1aa", display: "flex", gap: 12 }}>
                  {displayModel.size && <span>{displayModel.size}</span>}
                  {displayModel.precision && <span>{displayModel.precision}</span>}
                  {displayModel.role && <span style={{ textTransform: "capitalize" }}>{displayModel.role} Role</span>}
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{
                  background: "transparent", border: "none", color: "#a1a1aa",
                  cursor: "pointer", fontSize: 24, padding: 4, lineHeight: 1,
                }}
              >
                &times;
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: 24, overflowY: "auto" }}>
              <div style={{ fontSize: 15, color: "#e4e4e7", lineHeight: 1.6, fontWeight: 500, marginBottom: 20 }}>
                {displayModel.verdict}
              </div>

              {displayModel.notes && (
                <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 24, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  {displayModel.notes}
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {displayModel.evalTokPerSec && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1 }}>Throughput</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#fafafa", marginTop: 4 }}>
                      {displayModel.evalTokPerSec.toFixed(1)} <span style={{ fontSize: 13, color: "#a1a1aa", fontWeight: 400 }}>tok/s</span>
                    </div>
                  </div>
                )}
                
                {displayModel.evaluated && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1 }}>Evaluated</div>
                    <div style={{ fontSize: 14, color: "#fafafa", marginTop: 6 }}>
                      {new Date(displayModel.evaluated).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
