import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import DevLab from "./pages/DevLab";
import DesignerPortfolio from "./pages/DesignerPortfolio";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/dev" element={<DevLab />} />
        <Route path="/tmp" element={<DesignerPortfolio />} />
      </Routes>
    </Router>
  );
}
