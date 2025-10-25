import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

function MultiSelect({ label, options, selected, setSelected, disabled=false }){
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(()=>{ const fn=(e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('click',fn); return ()=>document.removeEventListener('click',fn);},[]);
  const labelText = selected.length===0? 'Todos' : `${selected.length} seleccionados`;
  return (
    <div className="relative" ref={ref}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <button disabled={disabled} onClick={(e)=>{ e.stopPropagation(); if(disabled) return; setOpen(v=>!v); }} className={`inline-flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm ring-1 ${disabled? 'border-slate-200 bg-slate-100 text-slate-400 ring-transparent' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 ring-slate-200'}`}>
        {labelText}
        <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-64 max-h-64 overflow-auto rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200" onClick={(e)=>e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-white p-2 text-xs">
            <button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([])}>Todos</button>
          </div>
          <div className="p-2 text-sm">
            {options.map(opt => {
              const id = String(opt.id);
              const checked = selected.length===0 ? true : selected.includes(id);
              return (
                <label key={id} className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-50">
                  <input type="checkbox" checked={checked} onChange={()=>{
                    setSelected(prev => prev.length===0 ? [id] : (prev.includes(id) ? prev.filter(v=>v!==id) : [...prev, id]));
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

export default function UbicacionesHabitaciones(){
  const { getAccessToken, signOut } = useAdminAuth();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [hospitales, setHospitales] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(()=>{ let active=true; (async()=>{
    setStatus('loading');
    try{
      const token=await getAccessToken(); if(!token) throw new Error('Sesion expirada');
      const res=await fetch(`${API}/admin/bootstrap`,{headers:{Authorization:`Bearer ${token}`}});
      if(res.status===401||res.status===403){ await signOut(); return; }
      if(!res.ok) throw new Error('No se pudieron cargar ubicaciones');
      const data=await res.json(); if(!active) return;
      setHospitales(data.hospitales||[]); setEdificios(data.edificios||[]); setPisos(data.pisos||[]);
      setServicios(data.servicios||[]); setHabitaciones(data.habitaciones||[]);
      setStatus('ok');
    }catch(e){ if(!active) return; setError(e.message); setStatus('error'); }
  })(); return ()=>{active=false}; },[getAccessToken,signOut]);

  // filtros
  const [instSel, setInstSel] = useState([]); // ids string
  const [edifSel, setEdifSel] = useState([]);
  const [pisoSel, setPisoSel] = useState([]);
  const [servSel, setServSel] = useState([]);

  const edificiosFiltrados = useMemo(()=> instSel.length===0? edificios : edificios.filter(e=>instSel.includes(String(e.id_hospital))),[edificios,instSel]);
  const pisosFiltrados = useMemo(()=> edifSel.length===0? pisos : pisos.filter(p=>edifSel.includes(String(p.id_edificio))),[pisos,edifSel]);

  const hospById = useMemo(()=>Object.fromEntries(hospitales.map(h=>[h.id_hospital,h])),[hospitales]);
  const edifById = useMemo(()=>Object.fromEntries(edificios.map(e=>[e.id_edificio,e])),[edificios]);
  const pisoById = useMemo(()=>Object.fromEntries(pisos.map(p=>[p.id_piso,p])),[pisos]);
  const servById = useMemo(()=>Object.fromEntries(servicios.map(s=>[s.id_servicio,s])),[servicios]);

  const filtradas = useMemo(()=>{
    return habitaciones.filter(h=>{
      if(instSel.length){ if(!instSel.includes(String(h.id_hospital))) return false; }
      if(edifSel.length){ const p=pisoById[h.id_piso]; if(!p || !edifSel.includes(String(p.id_edificio))) return false; }
      if(pisoSel.length && !pisoSel.includes(String(h.id_piso))) return false;
      if(servSel.length && !servSel.includes(String(h.id_servicio))) return false;
      return true;
    });
  },[habitaciones,instSel,edifSel,pisoSel,servSel,pisoById]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Habitaciones</h1>
      </header>

      {status==='loading' && <p className="text-sm text-slate-600">Cargando…</p>}
      {status==='error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status==='ok' && (
        <>
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Filtros</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MultiSelect label="Institución" options={hospitales.map(h=>({id:h.id_hospital,label:h.nombre}))} selected={instSel} setSelected={(vals)=>{ setInstSel(vals); setEdifSel([]); setPisoSel([]); }} />
              <MultiSelect label="Edificio" options={edificiosFiltrados.map(e=>({id:e.id_edificio,label:e.nombre}))} selected={edifSel} setSelected={(vals)=>{ setEdifSel(vals); setPisoSel([]); }} disabled={instSel.length===0} />
              <MultiSelect label="Piso" options={pisosFiltrados.map(p=>({id:p.id_piso,label:`${(edificios.find(e=>e.id_edificio===p.id_edificio)?.nombre)||('Edificio '+p.id_edificio)} — Piso ${p.numero}`}))} selected={pisoSel} setSelected={setPisoSel} disabled={edifSel.length===0} />
              <MultiSelect label="Servicio" options={servicios.map(s=>({id:s.id_servicio,label:s.nombre}))} selected={servSel} setSelected={setServSel} />
            </div>
          </section>

          <section>
            <div className="mb-2 text-sm text-slate-600">Resultados: {filtradas.length}</div>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID</th>
                    <th className={headerCell}>Nombre</th>
                    <th className={headerCell}>Piso</th>
                    <th className={headerCell}>Edificio</th>
                    <th className={headerCell}>Institución</th>
                    <th className={headerCell}>Servicio</th>
                  </tr>
                </thead>
                <tbody>
                  {filtradas.map(h => {
                    const p=pisoById[h.id_piso];
                    const e=p?edifById[p.id_edificio]:null;
                    const inst=e? hospById[e.id_hospital]:null;
                    return (
                      <tr key={h.id_habitacion}>
                        <td className={dataCell}>{h.id_habitacion}</td>
                        <td className={dataCell}>{h.nombre}</td>
                        <td className={dataCell}>{p?.numero ?? '—'}</td>
                        <td className={dataCell}>{e?.nombre ?? '—'}</td>
                        <td className={dataCell}>{inst?.nombre ?? '—'}</td>
                        <td className={dataCell}>{servById[h.id_servicio]?.nombre ?? '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

