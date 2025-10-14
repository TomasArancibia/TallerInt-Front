import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-ucchristus.png";

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
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-60 flex-col bg-slate-900 px-5 py-8 text-slate-100 sm:flex">
        <div className="flex items-center gap-3 pb-10">
          <img src={logo} alt="Logo UC Christus" className="h-10 w-auto rounded-lg bg-white p-1" />
          <h3 className="text-lg font-semibold">UC Solicitudes</h3>
        </div>

        <nav className="flex flex-col gap-2">
          {menu.map((item) => {
            const isActive = location.pathname.endsWith(item.path);
            return (
              <button
                key={item.path}
                className={`rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "bg-transparent text-slate-200 hover:bg-slate-800"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen w-full flex-1 flex-col bg-slate-50 px-4 py-6 sm:px-8">
        <Outlet />
      </div>
    </div>
  );
}
