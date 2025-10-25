import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Ubicaciones() {
  const { getAccessToken, signOut } = useAdminAuth();
  const [hospitales, setHospitales] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada");
        const res = await fetch(`${API}/admin/bootstrap`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 401 || res.status === 403) { await signOut(); return; }
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
    }
    fetchAll();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  const tableWrapper = "mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-lg font-semibold">Ubicaciones</h1>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando…</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">{error}</p>}
      {status === "ok" && (
        <>
          <section>
            <h3 className="text-lg font-semibold text-slate-800">Hospitales</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Hospital</th>
                    <th className={headerCell}>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitales.map((h) => (
                    <tr key={h.id_hospital}>
                      <td className={dataCell}>{h.id_hospital}</td>
                      <td className={dataCell}>{h.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Edificios</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Edificio</th>
                    <th className={headerCell}>Nombre</th>
                    <th className={headerCell}>ID Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {edificios.map((e) => (
                    <tr key={e.id_edificio}>
                      <td className={dataCell}>{e.id_edificio}</td>
                      <td className={dataCell}>{e.nombre}</td>
                      <td className={dataCell}>{e.id_hospital}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Pisos</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Piso</th>
                    <th className={headerCell}>Número</th>
                    <th className={headerCell}>ID Edificio</th>
                  </tr>
                </thead>
                <tbody>
                  {pisos.map((p) => (
                    <tr key={p.id_piso}>
                      <td className={dataCell}>{p.id_piso}</td>
                      <td className={dataCell}>{p.numero}</td>
                      <td className={dataCell}>{p.id_edificio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Servicios</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Servicio</th>
                    <th className={headerCell}>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((s) => (
                    <tr key={s.id_servicio}>
                      <td className={dataCell}>{s.id_servicio}</td>
                      <td className={dataCell}>{s.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Habitaciones</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Habitación</th>
                    <th className={headerCell}>Nombre</th>
                    <th className={headerCell}>ID Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {habitaciones.map((hab) => (
                    <tr key={hab.id_habitacion}>
                      <td className={dataCell}>{hab.id_habitacion}</td>
                      <td className={dataCell}>{hab.nombre}</td>
                      <td className={dataCell}>{hab.id_hospital ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Camas</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Cama</th>
                    <th className={headerCell}>Identificador QR</th>
                    <th className={headerCell}>ID Habitación</th>
                  </tr>
                </thead>
                <tbody>
                  {camas.map((c) => (
                    <tr key={c.id_cama}>
                      <td className={dataCell}>{c.id_cama}</td>
                      <td className={dataCell}>{c.qr}</td>
                      <td className={dataCell}>{c.id_habitacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
