import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Dashboard() {
  const [hospitales, setHospitales] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [camas, setCamas] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  // Rango por defecto: últimos 7 días
  const today = new Date();
  const start7 = new Date(today);
  start7.setDate(today.getDate() - 6);
  const pad = (n) => String(n).padStart(2, "0");
  const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; // evitar desfases por UTC
  const [fechaInicio, setFechaInicio] = useState(toYMD(start7));
  const [fechaFin, setFechaFin] = useState(toYMD(today));
  const [rangeOpen, setRangeOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [tmpStart, setTmpStart] = useState(toYMD(start7));
  const [tmpEnd, setTmpEnd] = useState(toYMD(today));
  // Metricas
  const [metricasArea, setMetricasArea] = useState([]);
  const [metricasHospitalEstado, setMetricasHospitalEstado] = useState([]);
  const [metricasAreaDia, setMetricasAreaDia] = useState([]);
  const { getAccessToken, signOut } = useAdminAuth();

  useEffect(() => {
    let active = true;
    async function fetchData() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error("Sesión expirada. Vuelva a iniciar sesión.");
        }

        const response = await fetch(`${API}/admin/bootstrap`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          await signOut();
          return;
        }

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del dashboard.");
        }

        const data = await response.json();
        if (!active) return;
        setUsuario(data.usuario);
        setHospitales(data.hospitales || []);
        setHabitaciones(data.habitaciones || []);
        setCamas(data.camas || []);
        setAreas(data.areas || []);
        setSolicitudes(data.solicitudes || []);
        setStatus("ok");
      } catch (err) {
        if (!active) return;
        setError(err.message);
        setStatus("error");
      }
    }

    fetchData();
    return () => {
      active = false;
    };
  }, [getAccessToken, signOut]);

  useEffect(() => {
    let active = true;
    async function fetchMetricas() {
      if (parseYMD(fechaFin) < parseYMD(fechaInicio)) {
        alert("Fecha inválida");
        return;
      }
      try {
        const token = await getAccessToken();
        if (!token) {
          throw new Error("Sesión expirada. Vuelva a iniciar sesión.");
        }

        const response = await fetch(
          `${API}/admin/metricas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 401 || response.status === 403) {
          await signOut();
          return;
        }

        if (!response.ok) {
          throw new Error("No se pudieron cargar las métricas.");
        }

        const data = await response.json();
        if (!active) return;
        setMetricasArea(data.por_area || []);
        setMetricasHospitalEstado(data.por_hospital_estado || []);
        setMetricasAreaDia(data.por_area_dia || []);
      } catch (err) {
        if (!active) return;
        console.error("Error cargando métricas:", err);
      }
    }

    fetchMetricas();
    return () => {
      active = false;
    };
  }, [fechaFin, fechaInicio, getAccessToken, signOut]);

  useEffect(() => {
    setTmpStart(fechaInicio);
    setTmpEnd(fechaFin);
  }, [fechaInicio, fechaFin]);

  // Últimos 15 días para métricas diarias
  const metricasUltimosDias = metricasAreaDia.filter(m => {
    const fecha = new Date(m.dia);
    const fechaFinal = new Date(fechaFin);
    const fechaLimite = new Date(fechaFinal);
    fechaLimite.setDate(fechaFinal.getDate() - 15);
    return fecha >= fechaLimite && fecha <= fechaFinal;
  });

  // Reorganizar datos para que recharts pueda leerlo
  const datosAgrupados = Object.values(metricasUltimosDias.reduce((acc, curr) => {
    const { dia, nombre_area, total_solicitudes } = curr;
    if (!acc[dia]) acc[dia] = { dia };
    acc[dia][nombre_area] = total_solicitudes;
    return acc;
  }, {}));

  const tableWrapper = "mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const tableClass = "min-w-full border-collapse text-left text-sm text-slate-700";
  const headerCell = "border border-slate-200 bg-slate-100 px-4 py-2 font-semibold text-slate-700";
  const dataCell = "border border-slate-200 px-4 py-2";

  const fmtLong = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "long", year: "numeric" });
  const parseYMD = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  };

  function setPreset(preset) {
    const d = new Date();
    const copy = (x) => new Date(x.getTime());
    let a = copy(d), b = copy(d);
    setCustomMode(false);
    if (preset === "today") {
    } else if (preset === "yesterday") {
      a.setDate(a.getDate() - 1);
    } else if (preset === "last7") {
      a.setDate(a.getDate() - 6);
    } else if (preset === "last30") {
      a.setDate(a.getDate() - 29);
    } else if (preset === "thisMonth") {
      a = new Date(d.getFullYear(), d.getMonth(), 1);
      b = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    } else if (preset === "lastMonth") {
      a = new Date(d.getFullYear(), d.getMonth() - 1, 1);
      b = new Date(d.getFullYear(), d.getMonth(), 0);
    } else if (preset === "custom") {
      setCustomMode(true);
      return;
    }
    setFechaInicio(toYMD(a));
    setFechaFin(toYMD(b));
    setRangeOpen(false);
  }

  function applyCustom() {
    if (parseYMD(tmpEnd) < parseYMD(tmpStart)) return alert("Rango inválido");
    setFechaInicio(tmpStart);
    setFechaFin(tmpEnd);
    setRangeOpen(false);
    setCustomMode(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-2xl bg-white px-4 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200 sm:px-6">
        <div className="grid grid-cols-3 items-center gap-3">
          <div />
          <h1 className="text-center text-xl font-semibold">Dashboard de Solicitudes</h1>
          <div className="relative justify-self-end">
            <button
              onClick={() => setRangeOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {`${fmtLong.format(parseYMD(fechaInicio))} - ${fmtLong.format(parseYMD(fechaFin))}`}
              <svg className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>

            {rangeOpen && (
              <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200">
                {!customMode ? (
                  <div className="py-1">
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("today")}>
                      Hoy
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("yesterday")}>
                      Ayer
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last7")}>
                      Últimos 7 días
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last30")}>
                      Últimos 30 días
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("thisMonth")}>
                      Este mes
                    </button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("lastMonth")}>
                      Último mes
                    </button>
                    <div className="my-1 border-t border-slate-200" />
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("custom")}>
                      Rango personalizado…
                    </button>
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
        </div>
      </header>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando datos...</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">Error: {error}</p>}
      {status === "ok" && (
        <>
          <section className="mt-4">
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

          <section className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800">Habitaciones</h3>
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

          <section className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800">Camas</h3>
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

          <section className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800">Áreas</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID Área</th>
                    <th className={headerCell}>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((a) => (
                    <tr key={a.id_area}>
                      <td className={dataCell}>{a.id_area}</td>
                      <td className={dataCell}>{a.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-8 mb-12">
            <h3 className="text-lg font-semibold text-slate-800">Solicitudes</h3>
            <div className={tableWrapper}>
              <table className={tableClass}>
                <thead>
                  <tr>
                    <th className={headerCell}>ID</th>
                    <th className={headerCell}>ID Cama</th>
                    <th className={headerCell}>Área</th>
                    <th className={headerCell}>Tipo</th>
                    <th className={headerCell}>Descripción</th>
                    <th className={headerCell}>Estado</th>
                    <th className={headerCell}>Solicitante</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((s) => (
                    <tr key={s.id}>
                      <td className={dataCell}>{s.id}</td>
                      <td className={dataCell}>{s.id_cama}</td>
                      <td className={dataCell}>{areas.find((a) => a.id_area === s.id_area)?.nombre || "—"}</td>
                      <td className={dataCell}>{s.tipo}</td>
                      <td className={dataCell}>{s.descripcion}</td>
                      <td className={dataCell}>{s.estado.replaceAll("_", " ")}</td>
                      <td className={dataCell}>{s.nombre_solicitante || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Métricas</h2>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Área</h3>
              <div className="mt-4 flex flex-wrap gap-5">
                {metricasArea.map((m) => (
                  <div
                    key={m.nombre_area}
                    className="w-full flex-1 min-w-[220px] rounded-2xl bg-white px-6 py-5 text-center shadow-md ring-1 ring-slate-200"
                  >
                    <h4 className="text-base font-semibold text-slate-700">{m.nombre_area}</h4>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{m.total_solicitudes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Institución</h3>
              <p className="mt-2 text-sm text-slate-500">
                Total general: {metricasHospitalEstado.reduce((sum, m) => sum + m.total_solicitudes, 0)}
              </p>

              <div className="mt-4 flex flex-wrap gap-6">
                {Array.from(new Set(metricasHospitalEstado.map((m) => m.nombre_hospital))).map((hospital) => {
                  const datosHospital = metricasHospitalEstado.filter(
                    (m) => m.nombre_hospital === hospital
                  );

                  const totalHospital = datosHospital.reduce((sum, m) => sum + m.total_solicitudes, 0);
                  const pendientes =
                    datosHospital.find((m) => m.estado === "pendiente")?.total_solicitudes || 0;
                  const enProceso =
                    datosHospital.find((m) => m.estado === "en_proceso")?.total_solicitudes || 0;
                  const cerradas =
                    datosHospital.find((m) => m.estado === "cerrada")?.total_solicitudes || 0;

                  const porcentaje =
                    totalHospital > 0
                      ? Math.round((cerradas / totalHospital) * 100)
                      : 0;

                  return (
                    <div
                      key={hospital}
                      className="w-full min-w-[260px] flex-1 rounded-2xl bg-white px-6 py-6 text-center shadow-md ring-1 ring-slate-200"
                    >
                      <h4 className="text-base font-semibold text-slate-700">{hospital}</h4>
                      <h2 className="mt-2 text-3xl font-bold text-slate-900">{totalHospital}</h2>
                      <div className="mx-auto my-4 flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-200 text-lg font-bold text-slate-900">
                        {porcentaje}%
                      </div>
                      <div className="flex justify-around text-sm text-slate-600">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-slate-900">{pendientes}</span>
                          <span>Pendientes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-slate-900">{enProceso}</span>
                          <span>En Proceso</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-slate-900">{cerradas}</span>
                          <span>Cerradas</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Totales por Área y Día (Últimos 15 días)
              </h3>
              <div className="mt-4 h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-2 py-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosAgrupados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {[...new Set(metricasUltimosDias.map((m) => m.nombre_area))].map((area, index) => (
                      <Bar
                        key={area}
                        dataKey={area}
                        name={area}
                        stackId="a"
                        fill={["#27ae60", "#e67e22", "#3498db", "#9b59b6", "#f1c40f"][index % 5]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
