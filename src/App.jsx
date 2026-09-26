import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import GraphicsLanding from "./pages/GraphicsLanding";
import GraphicsResume from "./pages/GraphicsResume";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graphics" element={<GraphicsLanding />} />
        <Route path="/graphics-resume" element={<GraphicsResume />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}
