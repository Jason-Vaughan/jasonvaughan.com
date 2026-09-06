import React, { useEffect } from "react";
import { createPortal } from "react-dom";

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

  if (!isOpen || !model) return null;

  const modalContent = (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, pointerEvents: "auto",
      background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)"
    }} onClick={handleClose}>
      
      {/* Dialog */}
      <div
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
              {model.name}
            </h3>
            <div style={{ marginTop: 6, fontSize: 13, color: "#a1a1aa", display: "flex", gap: 12 }}>
              {model.size && <span>{model.size}</span>}
              {model.precision && <span>{model.precision}</span>}
              {model.role && <span style={{ textTransform: "capitalize" }}>{model.role} Role</span>}
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
            {model.verdict}
          </div>

          {model.notes && (
            <div style={{ fontSize: 14, color: "#a1a1aa", lineHeight: 1.6, marginBottom: 24, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              {model.notes}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {model.evalTokPerSec && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1 }}>Eval Benchmark</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fafafa", marginTop: 4 }}>
                  {model.evalTokPerSec.toFixed(1)} <span style={{ fontSize: 13, color: "#a1a1aa", fontWeight: 400 }}>tok/s</span>
                </div>
              </div>
            )}
            
            {model.evaluated && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: 1 }}>Evaluated</div>
                <div style={{ fontSize: 14, color: "#fafafa", marginTop: 6 }}>
                  {new Date(model.evaluated).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : null;
}
