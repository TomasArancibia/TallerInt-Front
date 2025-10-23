import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PageNav, Logo } from "../components/ui.jsx";
import { useAdminAuth } from "../auth/AdminAuthContext.jsx";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, signOut } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const baseMenu = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Solicitudes", path: "solicitudes" },
    { name: "Ubicaciones", path: "ubicaciones" },
    { name: "Áreas de Solicitudes", path: "areas" },
    { name: "Usuarios", path: "usuarios" },
    { name: "Mi Perfil", path: "perfil" },
  ];

  const menu = baseMenu.filter((item) => {
    if (item.path === "usuarios" && usuario?.rol !== "ADMIN") {
      return false;
    }
    return true;
  });

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
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <PageNav backHref="/" />
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="text-right text-xs leading-tight text-slate-600 sm:text-sm">
              <p className="font-semibold text-slate-800">
                {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Usuario"}
              </p>
              <p className="uppercase tracking-wide text-[11px] text-slate-400 sm:text-xs">
                {usuario?.rol ?? ""}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
