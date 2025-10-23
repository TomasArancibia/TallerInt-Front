import React, { useEffect, useMemo, useState } from "react";
import { pageContainer, helperText, sectionStack, actionPurple } from "../../components/ui.jsx";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Usuarios() {
  const { usuario, getAccessToken } = useAdminAuth();
  const [areas, setAreas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [formEmail, setFormEmail] = useState("");
  const [formAreaId, setFormAreaId] = useState("");
  const [tempPassword, setTempPassword] = useState(null);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const isAdmin = usuario?.rol === "ADMIN";

  const areasOrdenadas = useMemo(
    () => [...areas].sort((a, b) => a.nombre.localeCompare(b.nombre)),
    [areas],
  );

  useEffect(() => {
    if (!isAdmin) {
      setStatus("ok");
      return;
    }

    async function fetchInitial() {
      setStatus("loading");
      setError(null);
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error("Sesión expirada, vuelva a iniciar sesión.");
        }

        const [areasRes, usuariosRes] = await Promise.all([
          fetch(`${API}/areas`),
          fetch(`${API}/admin/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        if (!areasRes.ok) {
          throw new Error("No se pudieron cargar las áreas");
        }

        if (usuariosRes.status === 401 || usuariosRes.status === 403) {
          throw new Error("No autorizado para gestionar usuarios");
        }

        if (!usuariosRes.ok) {
          const data = await usuariosRes.json().catch(() => ({}));
          throw new Error(data.detail || "Error al cargar usuarios");
        }

        const areasData = await areasRes.json();
        const usuariosData = await usuariosRes.json();

        setAreas(areasData);
        setUsuarios(usuariosData.usuarios ?? []);
        setStatus("ok");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }

    fetchInitial();
  }, [getAccessToken, isAdmin]);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setError(null);
    setTempPassword(null);

    if (!formEmail.trim() || !formAreaId) {
      setError("Debes ingresar un correo y seleccionar un área.");
      return;
    }

    setCreating(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Sesión expirada, vuelva a iniciar sesión.");
      }

      const response = await fetch(`${API}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formEmail.trim(),
          id_area: Number(formAreaId),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "No se pudo crear el usuario");
      }

      const data = await response.json();
      setUsuarios((prev) => [...prev, data.usuario].sort((a, b) => a.correo.localeCompare(b.correo)));
      setTempPassword({ correo: data.usuario.correo, password: data.temp_password });
      setFormEmail("");
      setFormAreaId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este jefe de área?")) {
      return;
    }

    setDeletingId(userId);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Sesión expirada, vuelva a iniciar sesión.");
      }

      const response = await fetch(`${API}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok && response.status !== 204) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "No se pudo eliminar el usuario");
      }

      setUsuarios((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleActive = async (userId, currentActive) => {
    setError(null);
    setTogglingId(userId);
    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error("Sesión expirada, vuelva a iniciar sesión.");
      }

      const response = await fetch(`${API}/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activo: !currentActive,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.detail || "No se pudo actualizar el estado del usuario");
      }

      const data = await response.json();
      setUsuarios((prev) =>
        prev
          .map((user) => (user.id === userId ? data.usuario : user))
          .sort((a, b) => a.correo.localeCompare(b.correo)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  if (!isAdmin) {
    return (
      <main className={pageContainer}>
        <div className={sectionStack}>
          <div className={`${actionPurple} pointer-events-none uppercase`}>Gestión de usuarios</div>
          <p className={helperText}>
            Solo los administradores pueden acceder a esta sección.
          </p>
        </div>
      </main>
    );
  }

  if (status === "loading") {
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
        <p className={helperText}>
          Crea o elimina cuentas de jefes de área. Al crear una nueva cuenta se generará una contraseña temporal.
        </p>

        <form
          onSubmit={handleCreateUser}
          className="w-full rounded-2xl border border-purple-200 bg-white px-6 py-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-slate-800">Nuevo jefe de área</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                Correo institucional
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="jefe.area@uc.cl"
                value={formEmail}
                onChange={(event) => setFormEmail(event.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="area">
                Área asignada
              </label>
              <select
                id="area"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                value={formAreaId}
                onChange={(event) => setFormAreaId(event.target.value)}
                required
              >
                <option value="">Seleccione un área…</option>
                {areasOrdenadas.map((area) => (
                  <option key={area.id_area} value={area.id_area}>
                    {area.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          {tempPassword ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <p className="font-semibold text-emerald-800">Usuario creado correctamente.</p>
              <p>
                Correo: <strong>{tempPassword.correo}</strong>
              </p>
              <p>
                Contraseña temporal:{" "}
                <strong className="font-mono">{tempPassword.password}</strong>
              </p>
              <p className="mt-2 text-xs text-emerald-700">
                Comparte esta contraseña temporal con el jefe de área. Deberá cambiarla al iniciar sesión.
              </p>
            </div>
          ) : null}

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className={`${actionPurple} w-auto px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {creating ? "Creando…" : "Crear jefe de área"}
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-left text-sm font-semibold text-slate-700">
            Jefes de área registrados
          </div>
          <table className="min-w-full border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr>
                <th className="border border-slate-200 px-4 py-2">Correo</th>
                <th className="border border-slate-200 px-4 py-2">Área</th>
                <th className="border border-slate-200 px-4 py-2">Estado</th>
                <th className="border border-slate-200 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => (
                <tr key={user.id}>
                  <td className="border border-slate-200 px-4 py-2">{user.correo}</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {user.area_nombre ?? "Sin asignar"}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {user.activo ? "Activo" : "Inactivo"}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deletingId === user.id}
                      >
                        {deletingId === user.id ? "Eliminando…" : "Eliminar"}
                      </button>
                      <button
                        className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        onClick={() => handleToggleActive(user.id, user.activo)}
                        disabled={togglingId === user.id}
                      >
                        {togglingId === user.id
                          ? "Actualizando…"
                          : user.activo
                            ? "Desactivar"
                            : "Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 ? (
                <tr>
                  <td
                    className="border border-slate-200 px-4 py-4 text-center text-sm text-slate-500"
                    colSpan={4}
                  >
                    No hay jefes de área registrados.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
