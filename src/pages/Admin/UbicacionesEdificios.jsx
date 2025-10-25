import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "production" ? "https://tallerintegracion-back.onrender.com" : "http://127.0.0.1:8000");

function MultiSelect({ label, options, selected, setSelected }){
  const [open,setOpen]=useState(false); const ref=useRef(null);
  useEffect(()=>{ const f=(e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener('click',f); return ()=>document.removeEventListener('click',f); },[]);
  const labelText = selected.length===0? 'Todos' : `${selected.length} seleccionados`;
  return (
    <div className="relative" ref={ref}>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <button onClick={(e)=>{ e.stopPropagation(); setOpen(v=>!v); }} className="inline-flex w-full items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm">
        {labelText}
        <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-64 max-h-64 overflow-auto rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200" onClick={(e)=>e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex items-center gap-2 bg-white p-2 text-xs"><button className="rounded-md border border-slate-300 px-2 py-1 hover:bg-slate-50" onClick={()=> setSelected([])}>Todos</button></div>
          <div className="p-2 text-sm">{options.map(o=>{ const id=String(o.id); const checked= selected.length===0?true:selected.includes(id); return (
            <label key={id} className="mb-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-50"><input type="checkbox" checked={checked} onChange={()=> setSelected(prev=> prev.length===0?[id]:(prev.includes(id)?prev.filter(v=>v!==id):[...prev,id])) } /><span className="truncate">{o.label}</span></label>
          );})}</div>
        </div>
      )}
    </div>
  );
}

export default function UbicacionesEdificios(){
  const { getAccessToken, signOut } = useAdminAuth();
  const [status,setStatus]=useState('idle'); const [error,setError]=useState(null);
  const [hospitales,setHospitales]=useState([]); const [edificios,setEdificios]=useState([]);
  useEffect(()=>{ let active=true; (async()=>{ setStatus('loading'); try{ const token=await getAccessToken(); if(!token) throw new Error('Sesion expirada'); const res=await fetch(`${API}/admin/bootstrap`,{headers:{Authorization:`Bearer ${token}`}}); if(res.status===401 || res.status===403){ await signOut(); return; } if(!res.ok) throw new Error('No se pudieron cargar ubicaciones'); const data=await res.json(); if(!active) return; setHospitales(data.hospitales||[]); setEdificios(data.edificios||[]); setStatus('ok'); }catch(e){ if(!active) return; setError(e.message); setStatus('error'); } })(); return ()=>{active=false}; },[getAccessToken,signOut]);

  const [instSel,setInstSel]=useState([]);
  const hospById = useMemo(()=>Object.fromEntries(hospitales.map(h=>[h.id_hospital,h])),[hospitales]);
  const filtradas = useMemo(()=> edificios.filter(e=> instSel.length? instSel.includes(String(e.id_hospital)): true),[edificios,instSel]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200"><h1 className="text-lg font-semibold">Edificios</h1></header>
      {status==='loading' && <p className="text-sm text-slate-600">Cargando…</p>}
      {status==='error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status==='ok' && (
        <>
          <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">Filtros</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MultiSelect label="Institución" options={hospitales.map(h=>({id:h.id_hospital,label:h.nombre}))} selected={instSel} setSelected={setInstSel} />
            </div>
          </section>
          <section>
            <div className="mb-2 text-sm text-slate-600">Resultados: {filtradas.length}</div>
            <div className={tableWrapper}>
              <table className={tableClass}><thead><tr><th className={headerCell}>ID Edificio</th><th className={headerCell}>Nombre</th><th className={headerCell}>Institución</th></tr></thead>
                <tbody>
                  {filtradas.map(e=> (<tr key={e.id_edificio}><td className={dataCell}>{e.id_edificio}</td><td className={dataCell}>{e.nombre}</td><td className={dataCell}>{hospById[e.id_hospital]?.nombre || '—'}</td></tr>))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
