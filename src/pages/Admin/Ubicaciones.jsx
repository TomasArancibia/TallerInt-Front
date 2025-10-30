import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Ubicaciones() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [hospitales, setHospitales] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);

  useEffect(() => {
    let active = true;
    (async () => {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const res = await fetch(`${API}/admin/bootstrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 || res.status === 403) {
          await signOut();
          return;
        }
        if (!res.ok) throw new Error("No se pudieron cargar ubicaciones");
        const data = await res.json();
        if (!active) return;
        setHospitales(data.hospitales || []);
        setEdificios(data.edificios || []);
        setPisos(data.pisos || []);
        setServicios(data.servicios || []);
        setHabitaciones(data.habitaciones || []);
        setCamas(data.camas || []);
        setStatus("ok");
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setStatus("error");
      }
    })();
    return () => {
      active = false;
    };
  }, [getAccessToken, signOut]);

  return (
    <div className="mx-auto w-full max-w-5xl py-6">
      <h1 className="mb-4 text-2xl font-bold">Ubicaciones</h1>

      {status === "loading" && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-600">
          Cargando…
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {status === "ok" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Hospitales</h2>
            <ul className="text-sm text-slate-700">
              {hospitales.map((h) => (
                <li key={h.id_hospital}>{h.nombre}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Edificios</h2>
            <ul className="text-sm text-slate-700">
              {edificios.map((e) => (
                <li key={e.id_edificio}>{e.nombre}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Pisos</h2>
            <ul className="text-sm text-slate-700">
              {pisos.map((p) => (
                <li key={p.id_piso}>{String(p.numero)}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Servicios</h2>
            <ul className="text-sm text-slate-700">
              {servicios.map((s) => (
                <li key={s.id_servicio}>{s.nombre}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Habitaciones</h2>
            <ul className="text-sm text-slate-700">
              {habitaciones.map((h) => (
                <li key={h.id_habitacion}>{h.nombre}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <h2 className="mb-2 text-lg font-semibold">Camas</h2>
            <ul className="text-sm text-slate-700">
              {camas.map((c) => (
                <li key={c.id_cama}>{c.qr}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
