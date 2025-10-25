import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { DashboardIcon, RequestsIcon, LocationsIcon, AreasIcon, UsersIcon, ProfileIcon } from "../components/icons.jsx";
import { useAdminAuth } from "../auth/AdminAuthContext.jsx";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, signOut } = useAdminAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);

  React.useEffect(() => {
    function closeAll() { setOpenMenu(null); setProfileOpen(false); }
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const baseMenu = [
    { name: "Dashboard", path: "dashboard", icon: DashboardIcon },
    { name: "Solicitudes", path: "solicitudes", icon: RequestsIcon },
    { name: "Ubicaciones", path: "ubicaciones", icon: LocationsIcon },
    { name: "Áreas de Solicitudes", path: "areas", icon: AreasIcon },
    { name: "Usuarios", path: "usuarios", icon: UsersIcon },
    { name: "Mi Perfil", path: "perfil", icon: ProfileIcon },
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
        <div>
          <div className="admin-brand">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-white">
              <DashboardIcon className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <h3 className="text-base font-semibold text-white">UC Solicitudes</h3>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Panel</p>
            </div>
          </div>

          <p className="admin-menu-label">Menu</p>
          <nav className="admin-menu">
            {menu.map((item) => {
              const Icon = item.icon ?? (() => null);
              const isDashboard = item.path === "dashboard";
              const pathname = location.pathname;
              const isActive =
                pathname.endsWith(item.path) || (isDashboard && (pathname === "/" || pathname === "/admin" || pathname.endsWith("/admin")));
              const hasDropdown = item.path !== "dashboard" && item.path !== "perfil";
              return (
                <div key={item.path}>
                  <div className={`group admin-nav-item ${isActive ? "admin-nav-item--active" : "admin-nav-item--idle"}`}>
                    <button
                      className="flex grow items-center gap-3 text-left"
                      onClick={(e) => { e.stopPropagation(); navigate(item.path); }}
                    >
                      <Icon className="admin-nav-icon" />
                      <span className="truncate">{item.name}</span>
                    </button>
                    {hasDropdown ? (
                      <button
                        className="admin-caret-btn"
                        aria-label="Mostrar opciones"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu((prev) => (prev === item.path ? null : item.path));
                        }}
                      >
                        <span className="admin-caret" aria-hidden>
                          {openMenu === item.path ? "▾" : "▸"}
                        </span>
                      </button>
                    ) : null}
                  </div>
                  {hasDropdown && openMenu === item.path && (
                    <div className="admin-submenu" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="admin-submenu-item"
                        onClick={() => { setOpenMenu(null); navigate(item.path); }}
                      >
                        Listar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

      </aside>

      <div className="admin-main">
        <div className="admin-topbar">
          <div className="flex w-full items-center justify-end gap-3">
            <div className="relative" onClick={(e)=> e.stopPropagation()}>
              <button
                onClick={(e) => { e.stopPropagation(); setProfileOpen((v) => !v); }}
                className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 sm:text-sm"
                title="Opciones de perfil"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold text-white">
                  {(usuario?.nombre?.[0] || "U").toUpperCase()}
                </span>
                <span className="text-left leading-tight">
                  {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Mi Perfil"}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200" onClick={(e)=> e.stopPropagation()}>
                  <button
                    onClick={() => { setProfileOpen(false); navigate("perfil"); }}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    Editar perfil
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
