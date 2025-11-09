import React, { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Areas() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [areas, setAreas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [pendingNames] = useState(() => {
    try { return JSON.parse(localStorage.getItem('admin-pending-user-names') || '{}'); } catch { return {}; }
  });

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
        if (!res.ok) throw new Error("No se pudieron cargar áreas");
        const data = await res.json();
        if (!active) return;
        setAreas(data.areas || []);
        setSolicitudes(data.solicitudes || []);

        const usersRes = await fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
        if (usersRes.ok) {
          const users = await usersRes.json();
          setUsuarios(users.usuarios ?? []);
        }
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

  // Paginación 10 por página
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(areas.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(areas.length, startIdx + PAGE_SIZE);
  const pageItems = useMemo(() => areas.slice(startIdx, endIdx), [areas, startIdx, endIdx]);

  const usuariosPorArea = useMemo(() => {
    const map = {};
    for (const u of usuarios) {
      if (u.id_area == null) continue;
      if (!u.activo) continue;
      if (!map[u.id_area]) map[u.id_area] = [];
      map[u.id_area].push(u);
    }
    for (const k of Object.keys(map)) {
      map[k] = map[k].sort((a,b)=> (a.nombre||'').localeCompare(b.nombre||'') || (a.apellido||'').localeCompare(b.apellido||''));
    }
    return map;
  }, [usuarios]);

  const pendientesPorArea = useMemo(() => {
    const map = {};
    for (const s of solicitudes) {
      if (!s || s.estado !== 'pendiente') continue;
      const id = s.id_area;
      map[id] = (map[id] || 0) + 1;
    }
    return map;
  }, [solicitudes]);

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Áreas de Solicitudes</h1>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando...</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status === "ok" && (
        <section>
          <div className="mb-2 text-sm text-slate-600">Resultados: {areas.length}</div>
          <div className={tableWrapper}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={headerCell}>Nombre</th>
                  <th className={headerCell}>Encargados</th>
                  <th className={headerCell}>Solicitudes pendientes</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((a) => (
                  <tr key={a.id_area}>
                    <td className={dataCell}>{a.nombre}</td>
                    <td className={dataCell}>
                      {(usuariosPorArea[a.id_area] ?? []).length === 0 ? (
                        <span className="text-slate-500">Sin encargados</span>
                      ) : (
                        <ul className="space-y-1">
                          {(usuariosPorArea[a.id_area] ?? []).map((u) => (
                            <li key={u.id} className="text-sm text-slate-700">
                              <span className="font-medium">{`${u.nombre || ''} ${u.apellido || ''}`.trim() || u.correo}</span>
                              <span className="text-slate-500"> · {u.correo}</span>
                              {u.telefono ? <span className="text-slate-500"> · {u.telefono}</span> : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className={dataCell}>{pendientesPorArea[a.id_area] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="text-slate-600">Mostrando {areas.length===0?0:(startIdx+1)}-{endIdx} de {areas.length}</div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page<=1} onClick={()=> setPage(p=>Math.max(1,p-1))}>Anterior</button>
              <span>Página {page} de {totalPages}</span>
              <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page>=totalPages} onClick={()=> setPage(p=>Math.min(totalPages,p+1))}>Siguiente</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
