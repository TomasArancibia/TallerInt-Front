import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Solicitudes() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
        if (!res.ok) throw new Error("No se pudieron cargar solicitudes");
        const data = await res.json();
        if (!active) return;
        setAreas(data.areas || []);
        setSolicitudes(data.solicitudes || []);
        setStatus("ok");
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setStatus("error");
      }
    }
    fetchAll();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Solicitudes</h1>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando…</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status === "ok" && (
        <section>
          <div className={tableWrapper}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={headerCell}>ID</th>
                  <th className={headerCell}>ID Cama</th>
                  <th className={headerCell}>Área</th>
                  <th className={headerCell}>Tipo</th>
                  <th className={headerCell}>Descripción</th>
                  <th className={headerCell}>Estado</th>
                  <th className={headerCell}>Solicitante</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id}>
                    <td className={dataCell}>{s.id}</td>
                    <td className={dataCell}>{s.id_cama}</td>
                    <td className={dataCell}>{areas.find((a) => a.id_area === s.id_area)?.nombre || "—"}</td>
                    <td className={dataCell}>{s.tipo}</td>
                    <td className={dataCell}>{s.descripcion}</td>
                    <td className={dataCell}>{s.estado.replaceAll("_", " ")}</td>
                    <td className={dataCell}>{s.nombre_solicitante || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
