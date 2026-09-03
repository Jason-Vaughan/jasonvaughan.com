import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { featuredProjects, gridProjects } from "../data/projects";

const allProjects = [...Object.values(featuredProjects), ...gridProjects];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen p-8 text-center" style={{ background: "#09090b", color: "#f4f4f5" }}>
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-amber-500 hover:text-amber-400">
          &larr; Return Home
        </Link>
      </div>
    );
  }

  const tagStyle = {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 9999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#a1a1aa",
  };

  const btnPrimary = {
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 24px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 14,
    textDecoration: "none",
    background: project.accent ? `linear-gradient(135deg, ${project.accent}, ${project.accentLight || project.accent})` : "#3f3f46",
    color: project.accent === "#D4AF37" ? "#0f1419" : "#fff",
  };

  return (
    <div className="min-h-screen text-zinc-100" style={{ background: "#09090b", color: "#f4f4f5" }}>
      {/* Dynamic Top Banner (Simulated navbar) */}
      <div style={{
        background: "linear-gradient(90deg, #fbbf24 0%, #d97706 100%)",
        color: "#000",
        textAlign: "center",
        padding: "9px 24px",
        fontSize: 13,
        fontWeight: 700,
      }}>
        ✨ <Link to="/" style={{ color: "#000", textDecoration: "underline" }}>Return to Portfolio</Link>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
        <Link to="/" style={{ color: project.accent || "#fbbf24", fontWeight: 600, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          &larr; Back to Portfolio
        </Link>

        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
          {project.logo || project.image ? (
            <img src={project.logo || project.image} alt={`${project.title} logo`} style={{ height: 64, width: 64, objectFit: "contain" }} />
          ) : null}
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, color: "#fafafa" }}>{project.title}</h1>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 600, color: project.accent || "#fbbf24", marginBottom: 24 }}>
          {project.subtitle || project.type || "Project Details"}
        </h2>

        {/* Main Content */}
        <div style={{ fontSize: 16, lineHeight: 1.8, color: "#d4d4d8", marginBottom: 48, whiteSpace: "pre-wrap" }}>
          {/* 
            Future-proofing: the plan notes user will expand this into long-form.
            For now, we render the blurb. 
          */}
          {project.longDescription || project.blurb}
        </div>

        {/* Tech Stack */}
        {(project.techStack || project.tags) && (
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#fafafa" }}>Technologies & Skills</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {(project.techStack || project.tags).map((t) => (
                <span key={t} style={tagStyle}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" style={btnPrimary}>
              View Live Site
            </a>
          )}
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" style={{ ...btnPrimary, background: "rgba(255,255,255,0.1)", color: "#fff" }}>
              View on GitHub
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" style={btnPrimary}>
              {project.linkLabel || "View Details"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
