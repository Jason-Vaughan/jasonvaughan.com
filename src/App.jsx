import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import DevLab from "./pages/DevLab";
import DesignerPreview from "./pages/DesignerPreview";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/dev" element={<DevLab />} />
        <Route path="/temp" element={<DesignerPreview />} />
      </Routes>
    </Router>
  );
}
