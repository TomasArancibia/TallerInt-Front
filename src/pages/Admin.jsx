import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-ucchristus.png";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Solicitudes", path: "solicitudes" },
    { name: "Ubicaciones", path: "ubicaciones" },
    { name: "Áreas de Solicitudes", path: "areas" },
    { name: "Usuarios", path: "usuarios" },
  ];

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo UC Christus" className="logo" />
          <h3>UC Solicitudes</h3>
        </div>

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <button
              key={item.path}
              className={`menu-item ${
                location.pathname.endsWith(item.path) ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-view">
        <Outlet /> 
      </div>
    </div>
  );
}
