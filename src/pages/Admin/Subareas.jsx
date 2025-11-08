import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Subareas() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [areas, setAreas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
        if (!res.ok) throw new Error("No se pudo cargar datos de subáreas");
        const data = await res.json();
        if (!active) return;
        setAreas(data.areas || []);
        setSolicitudes(data.solicitudes || []);
        // encargados (jefes de área)
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

  // MultiSelect simple (Todos, Ninguno, Algunos)
  const NONE = "__none__";
  function MultiSelect({ label, options, selected, setSelected, disabled=false }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      function onDoc(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
      document.addEventListener('click', onDoc);
      return () => document.removeEventListener('click', onDoc);
    }, []);
    const labelText = selected.includes(NONE) ? 'Ninguno' : (selected.length === 0 ? 'Todos' : `${selected.length} seleccionados`);
    return (
      <div className="relative" ref={ref}>
        <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
        <button
          disabled={disabled}
          onClick={(e)=>{ e.stopPropagation(); if (disabled) return; setOpen(v=>!v); }}
          className={`inline-flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm ring-1 ${disabled? 'border-slate-200 bg-slate-100 text-slate-400 ring-transparent' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 ring-slate-200'}`}
        >
          {labelText}
          <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
        </button>
        {open && (
          <div className="absolute z-20 mt-1 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <div className="max-h-64 overflow-y-auto">
              {[{id:NONE,label:'Ninguno'}, ...options].map((opt) => {
                const id = String(opt.id);
                const isAll = selected.length === 0;
                const isNone = selected.includes(NONE);
                const checked = isNone ? false : (isAll ? true : selected.includes(id));
                return (
                  <label key={id} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        setSelected((prev) => {
                          if (id === NONE) {
                            return prev.includes(NONE) ? [] : [NONE];
                          }
                          if (prev.includes(NONE)) return [id];
                          if (prev.length === 0) return [id];
                          return prev.includes(id) ? prev.filter(v=>v!==id) : [...prev, id];
                        });
                      }}
                    />
                    <span className="truncate">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  const [areasSel, setAreasSel] = useState([]);

  // Encargados por área
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

  // Filas de subáreas
  const subareasRows = useMemo(() => {
    const map = new Map(); // key areaId||tipo
    for (const s of solicitudes) {
      const areaId = s.id_area;
      const tipo = (s.tipo && String(s.tipo).trim()) || '-';
      const key = `${areaId}||${tipo}`;
      if (!map.has(key)) map.set(key, { areaId, subarea: tipo, pendientes: 0 });
      if (s.estado === 'pendiente') map.get(key).pendientes += 1;
    }
    const allRows = Array.from(map.values()).map(r => ({
      ...r,
      areaNombre: (areas.find(a => a.id_area === r.areaId)?.nombre) || '-'
    }));
    // Filtro: NONE => ninguno; [] => todos; algunos => filtrar
    if (areasSel.includes(NONE)) return [];
    const filtered = (areasSel.length === 0) ? allRows : allRows.filter(r => areasSel.includes(String(r.areaId)));
    filtered.sort((a,b)=> (a.areaNombre||'').localeCompare(b.areaNombre||'') || (a.subarea||'').localeCompare(b.subarea||''));
    return filtered;
  }, [areas, areasSel, solicitudes]);

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Subáreas</h1>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando...</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">{error}</p>}

      {status === "ok" && (
        <section>
          <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <MultiSelect
              label="Área"
              options={areas.map(a => ({ id: String(a.id_area), label: a.nombre }))}
              selected={areasSel}
              setSelected={setAreasSel}
            />
          </div>

          <div className={tableWrapper}>
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={headerCell}>Subárea</th>
                  <th className={headerCell}>Área</th>
                  <th className={headerCell}>Encargados</th>
                  <th className={headerCell}>Solicitudes pendientes</th>
                </tr>
              </thead>
              <tbody>
                {subareasRows.length === 0 ? (
                  <tr>
                    <td className={dataCell} colSpan={4}><span className="text-slate-500">Sin datos</span></td>
                  </tr>
                ) : subareasRows.map((r, idx) => (
                  <tr key={`${r.areaId}-${r.subarea}-${idx}`}>
                    <td className={dataCell}>{r.subarea}</td>
                    <td className={dataCell}>{r.areaNombre}</td>
                    <td className={dataCell}>
                      {(usuariosPorArea[r.areaId] ?? []).length === 0 ? (
                        <span className="text-slate-500">Sin encargados</span>
                      ) : (
                        <ul className="space-y-1">
                          {(usuariosPorArea[r.areaId] ?? []).map((u) => (
                            <li key={u.id} className="text-sm text-slate-700">
                              <span className="font-medium">{`${u.nombre || ''} ${u.apellido || ''}`.trim() || u.correo}</span>
                              <span className="text-slate-500"> · {u.correo}</span>
                              {u.telefono ? <span className="text-slate-500"> · {u.telefono}</span> : null}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className={dataCell}>{r.pendientes}</td>
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
