import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

const NONE = "__none__";
function MultiSelect({ label, options, selected, setSelected, disabled = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  const labelText = selected.includes(NONE) ? 'Ninguno' : (selected.length === 0 ? 'Todos' : `${selected.length} seleccionados`);
  return (
    <div className="relative" ref={ref}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <button
        disabled={disabled}
        onClick={(e) => { e.stopPropagation(); if (disabled) return; setOpen(v => !v); }}
        className={`inline-flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm ring-1 ${disabled ? 'border-slate-200 bg-slate-100 text-slate-400 ring-transparent' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 ring-slate-200'}`}
      >
        {labelText}
        <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-64 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200" onClick={(e)=>e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-white p-2 text-xs">
            <button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([])}>Todos</button>
            <button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([NONE])}>Ninguno</button>
            <div className="ml-auto text-[11px] text-slate-500">{options.length} opciones</div>
          </div>
          <div className="max-h-64 overflow-auto p-2 text-sm">
            {options.map(opt => {
              const id = String(opt.id);
              const isAll = selected.length === 0;
              const isNone = selected.includes(NONE);
              const checked = isNone ? false : (isAll ? true : selected.includes(id));
              return (
                <label key={id} className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-50">
                  <input type="checkbox" checked={checked} onChange={()=> setSelected(prev => { if (prev.includes(NONE)) return [id]; if (prev.length === 0) return [id]; return prev.includes(id) ? prev.filter(v=>v!==id) : [...prev, id]; })} />
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

export default function UbicacionesCamas() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [hospitales, setHospitales] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [camas, setCamas] = useState([]);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesion expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
        if (!res.ok) throw new Error("No se pudieron cargar ubicaciones");
        const data = await res.json();
        if (!active) return;
        setHospitales(data.hospitales || []);
        setEdificios(data.edificios || []);
        setPisos(data.pisos || []);
        setHabitaciones(data.habitaciones || []);
        setServicios(data.servicios || []);
        setCamas(data.camas || []);
        setStatus("ok");
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setStatus("error");
      }
    })();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  // filtros
  const [instSel, setInstSel] = useState([]);
  const [edifSel, setEdifSel] = useState([]);
  const [pisoSel, setPisoSel] = useState([]);
  const [habSel, setHabSel] = useState([]);
  const [servSel, setServSel] = useState([]);
  const [activoSel, setActivoSel] = useState([]);

  const edificiosFiltrados = useMemo(() => (instSel.length === 0 ? edificios : edificios.filter(e => instSel.includes(String(e.id_hospital)))), [edificios, instSel]);
  const pisosFiltrados = useMemo(() => (edifSel.length === 0 ? pisos : pisos.filter(p => edifSel.includes(String(p.id_edificio)))), [pisos, edifSel]);
  const habsFiltradas = useMemo(() => (pisoSel.length === 0 ? habitaciones : habitaciones.filter(h => pisoSel.includes(String(h.id_piso)))), [habitaciones, pisoSel]);

  const hospById = useMemo(() => Object.fromEntries(hospitales.map(h => [h.id_hospital, h])), [hospitales]);
  const edifById = useMemo(() => Object.fromEntries(edificios.map(e => [e.id_edificio, e])), [edificios]);
  const pisoById = useMemo(() => Object.fromEntries(pisos.map(p => [p.id_piso, p])), [pisos]);
  const habById = useMemo(() => Object.fromEntries(habitaciones.map(h => [h.id_habitacion, h])), [habitaciones]);
  const servById = useMemo(() => Object.fromEntries(servicios.map(s => [s.id_servicio, s])), [servicios]);

  const filtradas = useMemo(() => {
    return camas.filter(c => {
      if (habSel.length && !habSel.includes(String(c.id_habitacion))) return false;
      if (pisoSel.length) { const h = habById[c.id_habitacion]; const p = h ? pisoById[h.id_piso] : null; if (!p || !pisoSel.includes(String(p.id_piso))) return false; }
      if (edifSel.length) { const h = habById[c.id_habitacion]; const p = h ? pisoById[h.id_piso] : null; const e = p ? edifById[p.id_edificio] : null; if (!e || !edifSel.includes(String(e.id_edificio))) return false; }
      if (instSel.length) { const h = habById[c.id_habitacion]; const p = h ? pisoById[h.id_piso] : null; const e = p ? edifById[p.id_edificio] : null; if (!e || !instSel.includes(String(e.id_hospital))) return false; }
      if (servSel.length) { const h = habById[c.id_habitacion]; if (!h || !servSel.includes(String(h.id_servicio))) return false; }
      if (activoSel.length) { const want = activoSel.includes('true'); if (!!c.activo !== want) return false; }
      return true;
    });
  }, [camas, habSel, pisoSel, edifSel, instSel, servSel, activoSel, habById, pisoById, edifById]);

  async function handleToggleActiva(idCama, current) {
    setError(null);
    setTogglingId(idCama);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('Sesion expirada');
      const res = await fetch(`${API}/admin/camas/${idCama}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ activo: !current })
      });
      if (!res.ok) {
        const data = await res.json().catch(()=>({}));
        throw new Error(data.detail || 'No se pudo actualizar la cama');
      }
      const data = await res.json().catch(()=>null);
      const updated = data?.cama ?? data ?? null;
      setCamas(prev => prev.map(c => c.id_cama === idCama ? (updated ? { ...c, ...updated } : { ...c, activo: !current }) : c));
    } catch (e) {
      setError(e.message);
    } finally {
      setTogglingId(null);
    }
  }

  // Paginacion 10 por pagina
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  useEffect(()=>{ setPage(1); }, [instSel,edifSel,pisoSel,habSel,servSel,activoSel,filtradas.length]);
  const totalPages = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(filtradas.length, startIdx + PAGE_SIZE);
  const pageItems = useMemo(() => filtradas.slice(startIdx, endIdx), [filtradas, startIdx, endIdx]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200"><h1 className="text-lg font-semibold">Camas</h1></header>
      {status === 'loading' && <p className="text-sm text-slate-600">Cargando...</p>}
      {status === 'error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status === 'ok' && (
        <>
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Filtros</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MultiSelect label="Institución" options={hospitales.map(h=>({id:h.id_hospital,label:h.nombre}))} selected={instSel} setSelected={(vals)=>{ setInstSel(vals); setEdifSel([]); setPisoSel([]); setHabSel([]); }} />
              <MultiSelect label="Edificio" options={edificiosFiltrados.map(e=>({id:e.id_edificio,label:e.nombre}))} selected={edifSel} setSelected={(vals)=>{ setEdifSel(vals); setPisoSel([]); setHabSel([]); }} disabled={instSel.length===0} />
              <MultiSelect label="Piso" options={pisosFiltrados.map(p=>({id:p.id_piso,label:`${(edificios.find(e=>e.id_edificio===p.id_edificio)?.nombre)||('Edificio '+p.id_edificio)} - Piso ${p.numero}`}))} selected={pisoSel} setSelected={(vals)=>{ setPisoSel(vals); setHabSel([]); }} disabled={edifSel.length===0} />
              <MultiSelect label="Habitación" options={habsFiltradas.map(h=>({id:h.id_habitacion,label:h.nombre}))} selected={habSel} setSelected={setHabSel} disabled={pisoSel.length===0} />
              <MultiSelect label="Servicio" options={servicios.map(s=>({id:s.id_servicio,label:s.nombre}))} selected={servSel} setSelected={setServSel} />
              <MultiSelect label="Estado cama" options={[{id:'true',label:'Activa'},{id:'false',label:'Inactiva'}]} selected={activoSel} setSelected={setActivoSel} />
            </div>
          </section>

          <section>
            <div className="mb-2 text-sm text-slate-600">Resultados: {filtradas.length}</div>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead><tr>
                  <th className={headerCell}>Letra</th>
                  <th className={headerCell}>Identificador QR</th>
                  <th className={headerCell}>Habitación</th>
                  <th className={headerCell}>Piso</th>
                  <th className={headerCell}>Edificio</th>
                  <th className={headerCell}>Institución</th>
                  <th className={headerCell}>Servicio</th>
                  <th className={headerCell}>Estado</th>
                  <th className={headerCell}>Acciones</th>
                </tr></thead>
                <tbody>
                  {pageItems.map(c=>{ const h=habById[c.id_habitacion]; const p=h? pisoById[h.id_piso]:null; const e=p?edifById[p.id_edificio]:null; const inst=e? hospById[e.id_hospital]:null; return (
                    <tr key={c.id_cama}>
                      <td className={dataCell}>{c.letra}</td>
                      <td className={dataCell}>{c.qr}</td>
                      <td className={dataCell}>{h?.nombre || '-'}</td>
                      <td className={dataCell}>{p?.numero ?? '-'}</td>
                      <td className={dataCell}>{e?.nombre || '-'}</td>
                      <td className={dataCell}>{inst?.nombre || '-'}</td>
                      <td className={dataCell}>{h ? (servById[h.id_servicio]?.nombre || '-') : '-'}</td>
                      <td className={dataCell}>
                        <span className={c.activo
                          ? 'inline-flex items-center rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700'
                          : 'inline-flex items-center rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700'}>
                          {c.activo ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className={dataCell}>
                        <button
                          className={c.activo
                            ? 'rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed'
                            : 'rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60 disabled:cursor-not-allowed'}
                          onClick={() => handleToggleActiva(c.id_cama, c.activo)}
                          disabled={togglingId === c.id_cama}
                        >
                          {togglingId === c.id_cama ? 'Guardando...' : (c.activo ? 'Desactivar' : 'Activar')}
                        </button>
                      </td>
                    </tr>
                  );})}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-slate-600">Mostrando {filtradas.length===0?0:(startIdx+1)}-{endIdx} de {filtradas.length}</div>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page<=1} onClick={()=> setPage(p=>Math.max(1,p-1))}>Anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page>=totalPages} onClick={()=> setPage(p=>Math.min(totalPages,p+1))}>Siguiente</button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

