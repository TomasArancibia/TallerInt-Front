import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";

export default function AdminApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

