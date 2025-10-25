import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "production" ? "https://tallerintegracion-back.onrender.com" : "http://127.0.0.1:8000");

export default function UbicacionesServicios(){
  const { getAccessToken, signOut } = useAdminAuth();
  const [status,setStatus]=useState('idle'); const [error,setError]=useState(null);
  const [servicios,setServicios]=useState([]);
  useEffect(()=>{ let active=true; (async()=>{ setStatus('loading'); try{ const token=await getAccessToken(); if(!token) throw new Error('Sesion expirada'); const res=await fetch(`${API}/admin/bootstrap`,{headers:{Authorization:`Bearer ${token}`}}); if(res.status===401 || res.status===403){ await signOut(); return; } if(!res.ok) throw new Error('No se pudieron cargar datos'); const data=await res.json(); if(!active) return; setServicios(data.servicios||[]); setStatus('ok'); }catch(e){ if(!active) return; setError(e.message); setStatus('error'); } })(); return ()=>{active=false}; },[getAccessToken,signOut]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200"><h1 className="text-lg font-semibold">Servicios</h1></header>
      {status==='loading' && <p className="text-sm text-slate-600">Cargando…</p>}
      {status==='error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status==='ok' && (
        <section>
          <div className="mb-2 text-sm text-slate-600">Resultados: {servicios.length}</div>
          <div className={tableWrapper}>
            <table className={tableClass}><thead><tr><th className={headerCell}>ID Servicio</th><th className={headerCell}>Nombre</th></tr></thead>
              <tbody>
                {servicios.map(s=> (<tr key={s.id_servicio}><td className={dataCell}>{s.id_servicio}</td><td className={dataCell}>{s.nombre}</td></tr>))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
