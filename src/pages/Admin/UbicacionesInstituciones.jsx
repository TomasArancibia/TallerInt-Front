import React, { useEffect, useMemo, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function UbicacionesInstituciones() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [hospitales, setHospitales] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesion expirada");
        const res = await fetch(`${API}/admin/bootstrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 || res.status === 403) {
          await signOut();
          return;
        }
        if (!res.ok) throw new Error("No se pudieron cargar ubicaciones");
        const data = await res.json();
        if (!active) return;
        setHospitales(data.hospitales || []);
        setStatus("ok");
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setStatus("error");
      }
    })();
    return () => {
      active = false;
    };
  }, [getAccessToken, signOut]);

  const tableWrapper =
    "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass =
    "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell =
    "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  // Paginacion 10 por pagina
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(hospitales.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(hospitales.length, startIdx + PAGE_SIZE);
  const pageItems = useMemo(
    () => hospitales.slice(startIdx, endIdx),
    [hospitales, startIdx, endIdx]
  );

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Instituciones</h1>
      </header>
      {status === "loading" && (
        <p className="text-sm text-slate-600">Cargando...</p>
      )}
      {status === "error" && (
        <p className="text-sm font-semibold text-red-600">{error}</p>
      )}
      {status === "ok" && (
        <section>
          <div className="mb-2 text-sm text-slate-600">
            Resultados: {hospitales.length}
          </div>
          <div className={tableWrapper}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={headerCell}>ID</th>
                  <th className={headerCell}>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((h) => (
                  <tr key={h.id_hospital}>
                    <td className={dataCell}>{h.id_hospital}</td>
                    <td className={dataCell}>{h.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="text-slate-600">
              Mostrando {hospitales.length === 0 ? 0 : startIdx + 1}-{endIdx} de {" "}
              {hospitales.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </button>
              <span>Página {page} de {totalPages}</span>
              <button
                className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Siguiente
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

