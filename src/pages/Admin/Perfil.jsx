import React, { useMemo, useState } from "react";
import {
  pageContainer,
  sectionStack,
  helperText,
  actionPurple,
  actionWhite,
} from "../../components/ui.jsx";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Perfil() {
  const { usuario, getAccessToken, refreshProfile } = useAdminAuth();
  const pendingNames = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin-pending-user-names') || '{}'); } catch { return {}; }
  }, []);
  const isPlaceholder = (s) => {
    const t = String(s || '').trim().toLowerCase();
    return t === '' || t === 'pendiente' || t === 'pending';
  };
  const fallback = useMemo(() => {
    const raw = pendingNames[usuario?.correo?.toLowerCase?.()] || null;
    if (raw && typeof raw === 'object') return raw;
    if (typeof raw === 'string') {
      const [first = '', ...rest] = raw.split(' ').filter(Boolean);
      return { nombre: first, apellido: rest.join(' ') };
    }
    return { nombre: '', apellido: '' };
  }, [pendingNames, usuario?.correo]);
  const initialNombre = !isPlaceholder(usuario?.nombre) ? (usuario?.nombre ?? '') : (fallback.nombre ?? '');
  const initialApellido = !isPlaceholder(usuario?.apellido) ? (usuario?.apellido ?? '') : (fallback.apellido ?? '');
  const [nombre, setNombre] = useState(initialNombre);
  const [apellido, setApellido] = useState(initialApellido);
  const [telefono, setTelefono] = useState(usuario?.telefono ?? "");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!usuario) {
    return (
      <main className={pageContainer}>
        <div className={sectionStack}>
          <div className={`${actionPurple} pointer-events-none uppercase`}>Mi Perfil</div>
          <p className={helperText}>No se pudo cargar la información del usuario.</p>
        </div>
      </main>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password && password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setStatus("loading");
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Sesión expirada, vuelva a iniciar sesión.");
      }

      const payload = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim() || null,
        new_password: password ? password : null,
      };

      const response = await fetch(`${API}/admin/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "No se pudo actualizar el perfil");
      }

      await refreshProfile();
      setSuccess("Perfil actualizado correctamente.");
      setPassword("");
      setPasswordConfirm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className={pageContainer}>
      <section className={`${sectionStack} max-w-3xl`}>
        <div className={`${actionPurple} pointer-events-none uppercase`}>Mi Perfil</div>
        <p className={helperText}>
          Actualiza tus datos de contacto y, si lo deseas, define una nueva contraseña para tu cuenta.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-purple-200 bg-white px-6 py-6 text-left shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="nombre">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700" htmlFor="apellido">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="telefono">
                Teléfono de contacto
              </label>
              <input
                id="telefono"
                type="tel"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h3 className="text-sm font-semibold text-slate-700">Cambiar contraseña</h3>
            <p className="mt-1 text-xs text-slate-500">
              Déjalo vacío si no deseas modificarla.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700" htmlFor="passwordConfirm">
                  Confirmar contraseña
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
              {success}
            </p>
          ) : null}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`${actionPurple} w-auto px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {status === "loading" ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
