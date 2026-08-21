import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OceanAIStudio from "./pages/OceanAIStudio";

import "./styles/main.css";
import "./styles/studio.css";

export default function App() {
  return (
    <Router>
      <Header />

      <main className="oceanai-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studio" element={<OceanAIStudio />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
