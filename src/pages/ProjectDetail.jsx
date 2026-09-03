import React from "react";
import { useParams, Link } from "react-router-dom";
// import { projectsData } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen text-zinc-100 p-8" style={{ background: "#09090b", color: "#f4f4f5" }}>
      <Link to="/" className="text-amber-500 hover:text-amber-400 mb-8 inline-block">
        &larr; Back to Portfolio
      </Link>
      <h1 className="text-4xl font-bold mb-4">Project: {slug}</h1>
      <p className="text-gray-400">Detailed project view coming soon.</p>
    </div>
  );
}
