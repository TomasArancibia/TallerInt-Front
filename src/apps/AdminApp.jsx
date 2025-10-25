import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import Areas from "../pages/Admin/Areas.jsx";
import Ubicaciones from "../pages/Admin/Ubicaciones.jsx";
import Solicitudes from "../pages/Admin/Solicitudes.jsx";
import Usuarios from "../pages/Admin/Usuarios.jsx";
import Perfil from "../pages/Admin/Perfil.jsx";
import ResetPassword from "../pages/Admin/ResetPassword.jsx";
import AdminLogin from "../pages/Admin/Login.jsx";
import { AdminAuthProvider } from "../auth/AdminAuthContext.jsx";
import RequireAdminAuth from "../auth/RequireAdminAuth.jsx";

export default function AdminApp() {
  return (
    <Router>
      <AdminAuthProvider>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequireAdminAuth />}>
            <Route path="/" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="areas" element={<Areas />} />
              <Route path="ubicaciones" element={<Ubicaciones />} />
              <Route path="solicitudes" element={<Solicitudes />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="usuarios" element={<Usuarios />} />
            </Route>
          </Route>
        </Routes>
      </AdminAuthProvider>
    </Router>
  );
}
