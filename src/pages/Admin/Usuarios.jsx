import React, { useEffect, useMemo, useState } from "react";
import { pageContainer, helperText, sectionStack, actionPurple } from "../../components/ui.jsx";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

const PENDING_NAMES_KEY = "admin-pending-user-names";
const loadPendingNames = () => {
  try { return JSON.parse(localStorage.getItem(PENDING_NAMES_KEY) || "{}"); } catch { return {}; }
};
const savePendingNames = (map) => {
  try { localStorage.setItem(PENDING_NAMES_KEY, JSON.stringify(map)); } catch {}
};

export default function Usuarios() {
  const { usuario, getAccessToken } = useAdminAuth();
  const isAdmin = usuario?.rol === "ADMIN";

  const [areas, setAreas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [formNombre, setFormNombre] = useState("");
  const [formApellido, setFormApellido] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAreaId, setFormAreaId] = useState("");
  const [creating, setCreating] = useState(false);
  const [tempPassword, setTempPassword] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [pendingNames, setPendingNames] = useState(() => loadPendingNames());

  const areasOrdenadas = useMemo(() => [...areas].sort((a,b)=> a.nombre.localeCompare(b.nombre)), [areas]);

  useEffect(() => {
    if (!isAdmin) { setStatus("ok"); return; }
    (async () => {
      setStatus("loading"); setError(null);
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const [areasRes, usersRes] = await Promise.all([
          fetch(`${API}/areas`),
          fetch(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        if (!areasRes.ok) throw new Error("No se pudieron cargar las áreas");
        if (!usersRes.ok) throw new Error("Error al cargar usuarios");
        const areasData = await areasRes.json();
        const usersData = await usersRes.json();
        setAreas(areasData);
        setUsuarios(usersData.usuarios ?? []);
        setStatus("ok");
      } catch (e) { setError(e.message); setStatus("error"); }
    })();
  }, [getAccessToken, isAdmin]);

  async function handleCreateUser(ev){
    ev.preventDefault(); setError(null); setTempPassword(null);
    if(!formNombre.trim() || !formApellido.trim() || !formEmail.trim() || !formAreaId){
      setError("Debes ingresar nombre, apellido, correo y seleccionar un área.");
      return;
    }
    setCreating(true);
    try{
      const token = await getAccessToken(); if(!token) throw new Error("Sesión expirada");
      const res = await fetch(`${API}/admin/users`, {
        method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({ email: formEmail.trim(), id_area: Number(formAreaId) })
      });
      if(!res.ok){ const data = await res.json().catch(()=>({})); throw new Error(data.detail || 'No se pudo crear el usuario'); }
      const data = await res.json();
      setUsuarios(prev => [...prev, data.usuario].sort((a,b)=> a.correo.localeCompare(b.correo)));
      setTempPassword({ correo: data.usuario.correo, password: data.temp_password });
      const key = (data.usuario.correo || formEmail).trim().toLowerCase();
      const next = { ...pendingNames, [key]: { nombre: formNombre.trim(), apellido: formApellido.trim() } };
      setPendingNames(next); savePendingNames(next);
      setFormNombre(""); setFormApellido(""); setFormEmail(""); setFormAreaId("");
    }catch(e){ setError(e.message);} finally{ setCreating(false); }
  }

  async function handleDeleteUser(userId){
    if(!confirm('¿Estás seguro de eliminar este jefe de área?')) return;
    setDeletingId(userId); setError(null);
    try{
      const token = await getAccessToken(); if(!token) throw new Error('Sesión expirada');
      const toDelete = usuarios.find(u=>u.id===userId);
      const res = await fetch(`${API}/admin/users/${userId}`, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` }});
      if(!res.ok && res.status !== 204){ const d = await res.json().catch(()=>({})); throw new Error(d.detail || 'No se pudo eliminar'); }
      setUsuarios(prev => prev.filter(u=> u.id !== userId));
      if(toDelete?.correo){ const key = toDelete.correo.toLowerCase(); if(pendingNames[key]){ const next={...pendingNames}; delete next[key]; setPendingNames(next); savePendingNames(next);} }
    }catch(e){ setError(e.message);} finally{ setDeletingId(null); }
  }

  async function handleToggleActive(userId, currentActive){
    setTogglingId(userId); setError(null);
    try{
      const token = await getAccessToken(); if(!token) throw new Error('Sesión expirada');
      const res = await fetch(`${API}/admin/users/${userId}`, { method:'PATCH', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body: JSON.stringify({ activo: !currentActive }) });
      if(!res.ok){ const d = await res.json().catch(()=>({})); throw new Error(d.detail || 'No se pudo actualizar'); }
      const data = await res.json();
      setUsuarios(prev => prev.map(u=> u.id===userId ? data.usuario : u).sort((a,b)=> a.correo.localeCompare(b.correo)));
    }catch(e){ setError(e.message);} finally{ setTogglingId(null); }
  }

  if(!isAdmin){
    return (
      <main className={pageContainer}>
        <div className={sectionStack}>
          <div className={`${actionPurple} pointer-events-none uppercase`}>Gestión de usuarios</div>
          <p className={helperText}>Solo los administradores pueden acceder a esta sección.</p>
        </div>
      </main>
    );
  }

  if(status==='loading'){
    return (
      <main className={pageContainer}>
        <div className={sectionStack}>
          <div className={`${actionPurple} pointer-events-none uppercase`}>Gestión de usuarios</div>
          <p className={helperText}>Cargando información…</p>
        </div>
      </main>
    );
  }

  return (
    <main className={pageContainer}>
      <section className={`${sectionStack} max-w-4xl`}>
        <div className={`${actionPurple} pointer-events-none uppercase`}>Gestión de jefes de área</div>
        <p className={helperText}>Crea o elimina cuentas de jefes de área. Al crear una nueva cuenta se genera una contraseña temporal.</p>

        <form onSubmit={handleCreateUser} className="w-full rounded-2xl border border-purple-200 bg-white px-6 py-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Nuevo jefe de área</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="nombre">Nombre</label>
              <input id="nombre" type="text" className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300" placeholder="Nombre" value={formNombre} onChange={(e)=> setFormNombre(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="apellido">Apellido</label>
              <input id="apellido" type="text" className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300" placeholder="Apellido" value={formApellido} onChange={(e)=> setFormApellido(e.target.value)} required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Correo institucional</label>
              <input id="email" type="email" className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300" placeholder="jefe.area@uc.cl" value={formEmail} onChange={(e)=> setFormEmail(e.target.value)} required />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="area">Área asignada</label>
              <select id="area" className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300" value={formAreaId} onChange={(e)=> setFormAreaId(e.target.value)} required>
                <option value="">Seleccione un área…</option>
                {areasOrdenadas.map(a => (<option key={a.id_area} value={a.id_area}>{a.nombre}</option>))}
              </select>
            </div>
          </div>

          {error && (<p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">{error}</p>)}

          {tempPassword && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <p className="font-semibold text-emerald-800">Usuario creado correctamente.</p>
              <p>Correo: <strong>{tempPassword.correo}</strong></p>
              <p>Contraseña temporal: <strong className="font-mono">{tempPassword.password}</strong></p>
              <p className="mt-2 text-xs text-emerald-700">Comparte esta contraseña temporal con el jefe de área. Deberá cambiarla al iniciar sesión.</p>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button type="submit" disabled={creating} className={`${actionPurple} w-auto px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}>
              {creating ? 'Creando…' : 'Crear jefe de área'}
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-left text-sm font-semibold text-slate-700">Jefes de área registrados</div>
          <table className="min-w-full border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr>
                <th className="border border-slate-200 px-4 py-2">Correo</th>
                <th className="border border-slate-200 px-4 py-2">Nombre</th>
                <th className="border border-slate-200 px-4 py-2">Área</th>
                <th className="border border-slate-200 px-4 py-2">Estado</th>
                <th className="border border-slate-200 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => {
                const isPlaceholder = (s) => {
                  const t = String(s || '').trim().toLowerCase();
                  return t === '' || t === 'pendiente' || t === 'pending';
                };
                const backendFull = [u.nombre, u.apellido].filter(Boolean).join(' ').trim();
                const backendLooksValid = !(isPlaceholder(u.nombre) && isPlaceholder(u.apellido)) && backendFull !== '';
                const pendingKey = u.correo?.toLowerCase();
                const p = pendingNames[pendingKey];
                const pendingFull = p && typeof p === 'object' ? [p.nombre, p.apellido].filter(Boolean).join(' ').trim() : (typeof p === 'string' ? p : '');
                const nombreDisplay = backendLooksValid ? backendFull : (pendingFull || 'Pendiente');
                return (
                  <tr key={u.id}>
                    <td className="border border-slate-200 px-4 py-2">{u.correo}</td>
                    <td className="border border-slate-200 px-4 py-2">{nombreDisplay}</td>
                    <td className="border border-slate-200 px-4 py-2">{u.area_nombre ?? 'Sin asignar'}</td>
                    <td className="border border-slate-200 px-4 py-2">
                      <span className={u.activo ? 'inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700' : 'inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700'}>
                        {u.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="border border-slate-200 px-4 py-2">
                      <div className="flex flex-wrap gap-2">
                        <button className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60" onClick={()=> handleDeleteUser(u.id)} disabled={deletingId===u.id}>{deletingId===u.id ? 'Eliminando…' : 'Eliminar'}</button>
                        <button className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60" onClick={()=> handleToggleActive(u.id, u.activo)} disabled={togglingId===u.id}>{togglingId===u.id ? 'Actualizando…' : (u.activo ? 'Desactivar' : 'Activar')}</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {usuarios.length === 0 && (
                <tr>
                  <td className="border border-slate-200 px-4 py-4 text-center text-sm text-slate-500" colSpan={5}>No hay jefes de área registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
