import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PageNav, Logo } from "../components/ui.jsx";

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
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Logo className="h-10 w-auto rounded-lg bg-white p-1" />
          <h3 className="text-lg font-semibold">UC Solicitudes</h3>
        </div>

        <nav className="admin-menu">
          {menu.map((item) => {
            const isDashboard = item.path === "dashboard";
            const pathname = location.pathname;
            const isActive =
              pathname.endsWith(item.path) || (isDashboard && (pathname === "/" || pathname === "/admin" || pathname.endsWith("/admin")));
            return (
              <button
                key={item.path}
                className={`admin-nav-btn ${isActive ? "admin-nav-btn--active" : "admin-nav-btn--idle"}`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="admin-main">
        <PageNav backHref="/" className="mb-6" />
        <Outlet />
      </div>
    </div>
  );
}
