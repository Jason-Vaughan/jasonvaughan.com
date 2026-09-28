import React, { useState } from "react";
import BuilderStats from "../components/BuilderStats";
import Collapsible from "../components/Collapsible";

export default function DevLab() {
  const [activeView, setActiveView] = useState("mini");
  
  return (
    <div style={{ minHeight: "100vh", background: "#000", padding: "40px 20px", color: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", paddingBottom: 40, borderBottom: "1px solid #333" }}>
        <h1 style={{ margin: "0 0 20px" }}>Builder Stats Lab</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setActiveView("mini")} style={{ padding: "8px 16px", background: activeView === "mini" ? "#fbbf24" : "#333", color: activeView === "mini" ? "#000" : "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Mini Mode</button>
          <button onClick={() => setActiveView("collapsible")} style={{ padding: "8px 16px", background: activeView === "collapsible" ? "#fbbf24" : "#333", color: activeView === "collapsible" ? "#000" : "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Collapsible Mode</button>
          <button onClick={() => setActiveView("full")} style={{ padding: "8px 16px", background: activeView === "full" ? "#fbbf24" : "#333", color: activeView === "full" ? "#000" : "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Full Mode</button>
        </div>
      </div>
      
      <div style={{ maxWidth: 960, margin: "40px auto" }}>
        {activeView === "full" && (
          <BuilderStats visitorType="Engineer" />
        )}
        
        {activeView === "collapsible" && (
          <div style={{ padding: "0 24px" }}>
            <Collapsible
              id="builder-stats"
              title="Builder Statistics & Telemetry"
              icon="📊"
              description="Live CI/CD codebase telemetry and traction"
              statPill="Passing"
              bodyInWrap={true}
              provideId={true}
              highlighted={false}
              autoOpen={false}
              onToggle={() => {}}
            >
              <div style={{ margin: "-24px" }}>
                <BuilderStats visitorType="Engineer" />
              </div>
            </Collapsible>
          </div>
        )}
        
        {activeView === "mini" && (
          <div style={{ padding: "0 24px" }}>
            <div style={{
              borderRadius: 12,
              border: "1px solid #3f3f46",
              background: "linear-gradient(135deg, rgba(24,24,27,0.95), rgba(39,39,42,0.95))",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24 }}>📊</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, color: "#fafafa" }}>Live Telemetry</h4>
                  <p style={{ margin: 0, fontSize: 12, color: "#a1a1aa" }}>81,308 LOC • 31 Repos • 19,419 Downloads</p>
                </div>
              </div>
              <button style={{
                padding: "6px 12px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e4e4e7",
                fontSize: 12,
                cursor: "pointer"
              }}>
                Expand Full Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
