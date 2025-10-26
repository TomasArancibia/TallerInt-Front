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

  // PaginaciÃ³n 10 por pÃ¡gina
  const PAGE_SIZE = 10;
  const [page,setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(servicios.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = Math.min(servicios.length, startIdx + PAGE_SIZE);
  const pageItems = React.useMemo(()=> servicios.slice(startIdx, endIdx), [servicios, startIdx, endIdx]);

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200"><h1 className="text-lg font-semibold">Servicios</h1></header>
      {status==='loading' && <p className="text-sm text-slate-600">Cargandoâ€¦</p>}
      {status==='error' && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status==='ok' && (
        <section>
          <div className="mb-2 text-sm text-slate-600">Resultados: {servicios.length}</div>
          <div className={tableWrapper}>
            <table className={tableClass}><thead><tr><th className={headerCell}>ID Servicio</th><th className={headerCell}>Nombre</th></tr></thead>
              <tbody>
                {pageItems.map(s=> (<tr key={s.id_servicio}><td className={dataCell}>{s.id_servicio}</td><td className={dataCell}>{s.nombre}</td></tr>))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="text-slate-600">Mostrando {servicios.length===0?0:(startIdx+1)}â€“{endIdx} de {servicios.length}</div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page<=1} onClick={()=> setPage(p=>Math.max(1,p-1))}>Anterior</button>
              <span>PÃ¡gina {page} de {totalPages}</span>
              <button className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50" disabled={page>=totalPages} onClick={()=> setPage(p=>Math.min(totalPages,p+1))}>Siguiente</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

