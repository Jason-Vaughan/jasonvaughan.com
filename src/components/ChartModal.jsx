import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatBigNumber } from "../utils/format";

export default function ChartModal({ chartKey, data, onClose }) {
  const [timeframe, setTimeframe] = useState("all"); // '1w', '1m', '1y', 'all'

  // Filter data
  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Sort by date just in case
    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const now = new Date();
    let cutoff = new Date(0);
    
    if (timeframe === "1w") {
      cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === "1m") {
      cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (timeframe === "1y") {
      cutoff = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    return sorted.filter(d => new Date(d.date) >= cutoff);
  }, [data, timeframe]);

  const config = {
    loc: { label: "Lines of Code", color: "#38bdf8" },
    commits: { label: "Commits", color: "#a78bfa" },
    tests: { label: "Tests Passing", color: "#34d399" },
    tokens: { label: "AI Tokens", color: "#f472b6" },
    fixes: { label: "Fixes Shipped", color: "#06b6d4" },
    prs: { label: "PRs Merged", color: "#f97316" },
    refactored: { label: "Lines Refactored", color: "#ec4899" },
  }[chartKey] || { label: chartKey, color: "#fff" };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#18181b",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          width: "100%",
          maxWidth: 800,
          padding: 24,
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none", color: "#a1a1aa",
            cursor: "pointer", fontSize: 24,
            padding: 8
          }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px", color: "#f4f4f5" }}>
          Historical {config.label}
        </h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["1w", "1m", "1y", "all"].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              style={{
                background: timeframe === tf ? config.color : "rgba(255,255,255,0.05)",
                color: timeframe === tf ? "#000" : "#a1a1aa",
                border: `1px solid ${timeframe === tf ? config.color : "rgba(255,255,255,0.1)"}`,
                padding: "6px 12px",
                borderRadius: 999,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                fontSize: 12
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="#a1a1aa" 
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return `${d.getMonth()+1}/${d.getDate()}`;
                }}
              />
              <YAxis 
                stroke="#a1a1aa" 
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
                tickFormatter={(val) => {
                  if (val >= 1e9) return (val / 1e9).toFixed(1) + 'B';
                  if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M';
                  if (val >= 1e3) return (val / 1e3).toFixed(1) + 'k';
                  return val;
                }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ background: "#27272a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                labelStyle={{ color: "#a1a1aa", marginBottom: 8 }}
                formatter={(value) => [formatBigNumber(value), config.label]}
              />
              <Line 
                type="monotone" 
                dataKey={chartKey} 
                stroke={config.color} 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: config.color, stroke: "#18181b", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
