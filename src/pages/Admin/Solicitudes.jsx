import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Solicitudes() {
  const { getAccessToken, signOut } = useAdminAuth();

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [hospitales, setHospitales] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [changingId, setChangingId] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesion expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
        if (!res.ok) throw new Error("No se pudieron cargar solicitudes");
        const data = await res.json();
        if (!active) return;
        setUsuario(data.usuario || null);
        setAreas(data.areas || []);
        setHospitales(data.hospitales || []);
        setEdificios(data.edificios || []);
        setPisos(data.pisos || []);
        setHabitaciones(data.habitaciones || []);
        setCamas(data.camas || []);
        setSolicitudes(data.solicitudes || []);
        setStatus("ok");
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setStatus("error");
      }
    }
    load();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  // Estilos
  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  async function handleCambiarEstado(id, nuevoEstado){
    try{
      setChangingId(id);
      const token = await getAccessToken();
      const url = `${API}/solicitudes/${id}/estado?nuevo_estado=${encodeURIComponent(nuevoEstado)}`;
      const res = await fetch(url, { method:'PUT', headers: token ? { Authorization:`Bearer ${token}` } : {} });
      if(!res.ok){ const data = await res.json().catch(()=>({})); throw new Error(data.detail || 'No se pudo actualizar el estado'); }
      const data = await res.json().catch(()=>null);
      const updated = data?.solicitud;
      setSolicitudes(prev => prev.map(s => s.id === id ? (updated ? { ...s, ...updated } : { ...s, estado: nuevoEstado }) : s));
    }catch(e){
      alert(e.message);
    }finally{
      setChangingId(null);
    }
  }

  // Utiles de fecha + MultiSelect
  const fmtLong = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "long", year: "numeric" });
  const fmtDateTime = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const parseYMD = (s) => { const [y,m,d] = String(s||"").split("-").map(Number); return new Date(y, (m||1)-1, d||1); };
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
          <div className="absolute z-50 mt-2 w-64 max-h-64 overflow-auto rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200">
            <div className="sticky top-0 z-10 flex items-center gap-2 bg-white p-2 text-xs">
              <button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([])}>Todos</button>
              <button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([NONE])}>Ninguno</button>
              <div className="ml-auto text-[11px] text-slate-500">{options.length} opciones</div>
            </div>
            <div className="p-2 text-sm">
              {options.map(opt => {
                const id = String(opt.id);
                const isAll = selected.length === 0;
                const isNone = selected.includes(NONE);
                const checked = isNone ? false : (isAll ? true : selected.includes(id));
                return (
                  <label key={id} className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-50">
                    <input type="checkbox" checked={checked} onChange={() => {
                      setSelected(prev => {
                        if (prev.includes(NONE)) return [id];
                        if (prev.length === 0) return [id];
                        return prev.includes(id) ? prev.filter(v=>v!==id) : [...prev, id];
                      });
                    }} />
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

  // Estados de filtros
  const pad = (n) => String(n).padStart(2, "0");
  const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = new Date();
  const start7 = new Date(today); start7.setDate(today.getDate() - 6);
  const [fechaInicio, setFechaInicio] = useState(toYMD(start7));
  const [fechaFin, setFechaFin] = useState(toYMD(today));
  const [rangeOpen, setRangeOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [tmpStart, setTmpStart] = useState(toYMD(start7));
  const [tmpEnd, setTmpEnd] = useState(toYMD(today));
  const [estadosSel, setEstadosSel] = useState(["pendiente", "en_proceso", "cerrada"]);
  const [areasSel, setAreasSel] = useState([]);
  const [instSel, setInstSel] = useState([]);
  const [edifSel, setEdifSel] = useState([]);
  const [pisoSel, setPisoSel] = useState([]);

  function setPreset(preset) {
    const d = new Date(); const c = (x)=> new Date(x.getTime()); let a=c(d), b=c(d);
    setCustomMode(false);
    if (preset === "today") {
    } else if (preset === "yestoday") { a.setDate(a.getDate()-1);} else if (preset === "last7") { a.setDate(a.getDate()-6);} else if (preset === "last30") { a.setDate(a.getDate()-29);} else if (preset === "thisMonth") { a = new Date(d.getFullYear(), d.getMonth(), 1); b = new Date(d.getFullYear(), d.getMonth()+1, 0);} else if (preset === "lastMonth") { a = new Date(d.getFullYear(), d.getMonth()-1, 1); b = new Date(d.getFullYear(), d.getMonth(), 0);} else if (preset === "custom") { setCustomMode(true); return; }
    setFechaInicio(toYMD(a)); setFechaFin(toYMD(b)); setRangeOpen(false);
  }
  function applyCustom() {
    if (parseYMD(tmpEnd) < parseYMD(tmpStart)) return alert("Rango invalido");
    setFechaInicio(tmpStart); setFechaFin(tmpEnd); setRangeOpen(false); setCustomMode(false);
  }

  // Vistas dependientes
  const edificiosFiltrados = useMemo(() => (
    instSel.length === 0 ? edificios : edificios.filter(e => instSel.includes(String(e.id_hospital)))
  ), [edificios, instSel]);
  const pisosFiltrados = useMemo(() => (
    edifSel.length === 0 ? pisos : pisos.filter(p => edifSel.includes(String(p.id_edificio)))
  ), [pisos, edifSel]);

  // Indexes
  const camasById = useMemo(() => Object.fromEntries(camas.map(c => [c.id_cama, c])), [camas]);
  const habitById = useMemo(() => Object.fromEntries(habitaciones.map(h => [h.id_habitacion, h])), [habitaciones]);
  const pisoById = useMemo(() => Object.fromEntries(pisos.map(p => [p.id_piso, p])), [pisos]);
  const edifById = useMemo(() => Object.fromEntries(edificios.map(e => [e.id_edificio, e])), [edificios]);
  const hospById = useMemo(() => Object.fromEntries(hospitales.map(h => [h.id_hospital, h])), [hospitales]);

  // Filtro + orden por ID ascendente
  const filtradas = useMemo(() => {
    const ini = parseYMD(fechaInicio); const fin = parseYMD(fechaFin); fin.setHours(23,59,59,999);
    const res = solicitudes.filter((s) => {
      const d = s.fecha_creacion ? new Date(s.fecha_creacion) : null;
      if (d && (d < ini || d > fin)) return false;
      if (estadosSel.includes(NONE)) return false;
      if (areasSel.includes(NONE)) return false;
      if (instSel.includes(NONE)) return false;
      if (edifSel.includes(NONE)) return false;
      if (pisoSel.includes(NONE)) return false;
      if (estadosSel.length && !estadosSel.includes(s.estado)) return false;
      const isAdmin = (usuario?.rol === 'ADMIN');
      if (isAdmin) {
        if (areasSel.length && !areasSel.includes(String(s.id_area))) return false;
      } else {
        if (usuario?.id_area && s.id_area !== usuario.id_area) return false;
      }
      const cama = camasById[s.id_cama];
      const hab = cama ? habitById[cama.id_habitacion] : null;
      const piso = hab ? pisoById[hab.id_piso] : null;
      const edif = piso ? edifById[piso.id_edificio] : null;
      const inst = edif ? edif.id_hospital : null;
      if (instSel.length && !instSel.includes(String(inst))) return false;
      if (edifSel.length && (!edif || !edifSel.includes(String(edif.id_edificio)))) return false;
      if (pisoSel.length && (!piso || !pisoSel.includes(String(piso.id_piso)))) return false;
      return true;
    });
    return res.slice().sort((a,b)=> (a.id ?? 0) - (b.id ?? 0));
  }, [solicitudes, fechaInicio, fechaFin, estadosSel, areasSel, instSel, edifSel, pisoSel, camasById, habitById, pisoById, edifById, usuario]);

  // Paginacion simple 10 por pagina
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [fechaInicio, fechaFin, estadosSel, areasSel, instSel, edifSel, pisoSel]);
  const totalPages = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(filtradas.length, startIdx + PAGE_SIZE);
  const pageItems = useMemo(() => filtradas.slice(startIdx, endIdx), [filtradas, startIdx, endIdx]);

  // Expand/colapse
  const [openRows, setOpenRows] = useState(new Set());
  const toggleRow = (id) => setOpenRows(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Solicitudes</h1>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando...</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status === "ok" && (
        <>
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Filtros</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="relative">
                <label className="mb-1 block text-xs font-medium text-slate-600">Rango de fechas</label>
                <button
                  onClick={() => setRangeOpen((v) => !v)}
                  className="inline-flex w-full items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {`${fmtLong.format(parseYMD(fechaInicio))} - ${fmtLong.format(parseYMD(fechaFin))}`}
                  <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
                </button>
                {rangeOpen && (
                  <div className="absolute z-50 mt-2 w-64 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200">
                    {!customMode ? (
                      <div className="py-1">
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("today")}>Hoy</button>
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last7")}>Ultimos 7 dias</button>
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last30")}>Ultimos 30 dias</button>
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("thisMonth")}>Este mes</button>
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("lastMonth")}>Ultimo mes</button>
                        <div className="my-1 border-t border-slate-200" />
                        <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("custom")}>Rango personalizado...</button>
                      </div>
                    ) : (
                      <div className="p-3">
                        <div className="flex items-center gap-2">
                          <input type="date" className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm" value={tmpStart} onChange={(e) => setTmpStart(e.target.value)} />
                          <span className="text-sm text-slate-500">a</span>
                          <input type="date" className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm" value={tmpEnd} onChange={(e) => setTmpEnd(e.target.value)} />
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <button className="rounded-md px-3 py-1 text-sm text-slate-600 hover:bg-slate-50" onClick={() => setCustomMode(false)}>Volver</button>
                          <button className="rounded-md bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800" onClick={applyCustom}>Aplicar</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <MultiSelect label="Estado" options={[{id:'pendiente',label:'Pendiente'},{id:'en_proceso',label:'En Proceso'},{id:'cerrada',label:'Cerrada'}]} selected={estadosSel} setSelected={setEstadosSel} />
              {(usuario?.rol === 'ADMIN') && (
                <MultiSelect label="Area" options={areas.map(a=>({id:a.id_area,label:a.nombre}))} selected={areasSel} setSelected={setAreasSel} />
              )}
              <MultiSelect label="Institucion" options={hospitales.map(h=>({id:h.id_hospital,label:h.nombre}))} selected={instSel} setSelected={(vals)=>{ setInstSel(vals); setEdifSel([]); setPisoSel([]); }} />
              <MultiSelect label="Edificio" options={edificiosFiltrados.map(e=>({id:e.id_edificio,label:e.nombre}))} selected={edifSel} setSelected={(vals)=>{ setEdifSel(vals); setPisoSel([]); }} disabled={instSel.length===0} />
              <MultiSelect label="Piso" options={pisosFiltrados.map(p=>({id:p.id_piso,label:`${(edificios.find(e=>e.id_edificio===p.id_edificio)?.nombre)||('Edificio '+p.id_edificio)} - Piso ${p.numero}`}))} selected={pisoSel} setSelected={setPisoSel} disabled={edifSel.length===0} />
            </div>
          </section>

          <section>
            <div className="mb-2 text-sm text-slate-600">Resultados: {filtradas.length}</div>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>Area</th>
                    <th className={headerCell}>Habitacion</th>
                    <th className={headerCell}>Cama</th>
                    <th className={headerCell}>Piso</th>
                    <th className={headerCell}>Edificio</th>
                    <th className={headerCell}>Institucion</th>
                    <th className={headerCell}>Solicitante</th>
                    <th className={headerCell}>Fecha de creacion</th>
                    <th className={headerCell}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((s) => {
                    const cama = camasById[s.id_cama];
                    const hab = cama ? habitById[cama.id_habitacion] : null;
                    const piso = hab ? pisoById[hab.id_piso] : null;
                    const edif = piso ? edifById[piso.id_edificio] : null;
                    const inst = edif ? hospById[edif.id_hospital] : null;
                    const isOpen = openRows.has(s.id);
                    const estadoClass = s.estado === 'cerrada'
                      ? 'inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700'
                      : (s.estado === 'en_proceso'
                          ? 'inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800'
                          : 'inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700');
                    return (
                      <React.Fragment key={s.id}>
                        <tr onClick={() => toggleRow(s.id)} className={isOpen ? 'bg-slate-50' : 'hover:bg-slate-50'} style={{cursor:'pointer'}}>
                          <td className={dataCell}>{areas.find(a => a.id_area === s.id_area)?.nombre || 'â€”'}</td>
                          <td className={dataCell}>{hab?.nombre || 'â€”'}</td>
                          <td className={dataCell}>{cama?.letra || 'â€”'}</td>
                          <td className={dataCell}>{piso?.numero ?? 'â€”'}</td>
                          <td className={dataCell}>{edif?.nombre || 'â€”'}</td>
                          <td className={dataCell}>{inst?.nombre || 'â€”'}</td>
                          <td className={dataCell}>{s.nombre_solicitante || 'â€”'}</td>
                          <td className={dataCell}>{s.fecha_creacion ? fmtDateTime.format(new Date(s.fecha_creacion)) : 'â€”'}</td>
                          <td className={dataCell}>
                            <div className="flex items-center gap-2" onClick={(e)=> e.stopPropagation()}>
                              <span className={estadoClass}>{(s.estado || '').replaceAll('_',' ')}</span>
                              {usuario?.rol === 'JEFE_AREA' && (
                                <select
                                  value={s.estado || 'pendiente'}
                                  disabled={changingId === s.id}
                                  onChange={(e)=> handleCambiarEstado(s.id, e.target.value)}
                                  className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                                >
                                  <option value="pendiente">Pendiente</option>
                                  <option value="en_proceso">En proceso</option>
                                  <option value="cerrada">Cerrada</option>
                                </select>
                              )}
                            </div>
                          </td>
                        </tr>
                        {isOpen && (
                          <tr>
                            <td className={dataCell} colSpan={9}>
                              <div className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">
                                <div><span className="font-semibold">Subarea:</span> {s.tipo || '-'}</div>
                                <div className="mt-1"><span className="font-semibold">Descripcion:</span> {s.descripcion || '-'}</div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-slate-600">Mostrando {filtradas.length === 0 ? 0 : (startIdx + 1)}-{endIdx} de {filtradas.length}</div>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente</button>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}


