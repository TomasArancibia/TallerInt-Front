import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin.jsx";
import Dashboard from "../pages/Admin/Dashboard.jsx";
import Areas from "../pages/Admin/Areas.jsx";
import Subareas from "../pages/Admin/Subareas.jsx";
import Ubicaciones from "../pages/Admin/Ubicaciones.jsx";
import UbicacionesHabitaciones from "../pages/Admin/UbicacionesHabitaciones.jsx";
import UbicacionesPisos from "../pages/Admin/UbicacionesPisos.jsx";
import UbicacionesEdificios from "../pages/Admin/UbicacionesEdificios.jsx";
import UbicacionesInstituciones from "../pages/Admin/UbicacionesInstituciones.jsx";
import UbicacionesServicios from "../pages/Admin/UbicacionesServicios.jsx";
import UbicacionesCamas from "../pages/Admin/UbicacionesCamas.jsx";
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
              <Route path="subareas" element={<Subareas />} />
              <Route path="ubicaciones" element={<Ubicaciones />} />
              <Route path="ubicaciones/habitaciones" element={<UbicacionesHabitaciones />} />
              <Route path="ubicaciones/pisos" element={<UbicacionesPisos />} />
              <Route path="ubicaciones/edificios" element={<UbicacionesEdificios />} />
              <Route path="ubicaciones/instituciones" element={<UbicacionesInstituciones />} />
              <Route path="ubicaciones/servicios" element={<UbicacionesServicios />} />
              <Route path="ubicaciones/camas" element={<UbicacionesCamas />} />
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
