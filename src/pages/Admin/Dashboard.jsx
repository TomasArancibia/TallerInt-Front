import React, { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Dashboard() {
  const [hospitales, setHospitales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Rango por defecto: últimos 7 días
  const today = new Date();
  const start7 = new Date(today);
  start7.setDate(today.getDate() - 6);
  const pad2 = (n) => String(n).padStart(2, "0");
  const toYMD = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; // anclado a local
  const [fechaInicio, setFechaInicio] = useState(toYMD(start7));
  const [fechaFin, setFechaFin] = useState(toYMD(today));
  const [rangeOpen, setRangeOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [tmpStart, setTmpStart] = useState(toYMD(start7));
  const [tmpEnd, setTmpEnd] = useState(toYMD(today));

  // Métricas
  const [metricasArea, setMetricasArea] = useState([]);
  const [metricasHospitalEstado, setMetricasHospitalEstado] = useState([]);
  const [metricasAreaDia, setMetricasAreaDia] = useState([]);
  const [promArea, setPromArea] = useState([]);
  const [promHospital, setPromHospital] = useState([]);
  const { getAccessToken, signOut } = useAdminAuth();

  useEffect(() => {
    let active = true;
    async function fetchData() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada. Vuelva a iniciar sesión.");

        const response = await fetch(`${API}/admin/bootstrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) { await signOut(); return; }
        if (!response.ok) throw new Error("No se pudo cargar la información del dashboard.");

        const data = await response.json();
        if (!active) return;
        setUsuario(data.usuario || null);
        setHospitales(data.hospitales || []);
        setAreas(data.areas || []);
        setStatus("ok");
      } catch (err) {
        if (!active) return;
        setError(err.message);
        setStatus("error");
      }
    }
    fetchData();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  useEffect(() => {
    let active = true;
    async function fetchMetricas() {
      if (parseYMD(fechaFin) < parseYMD(fechaInicio)) { alert("Rango inválido"); return; }
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada. Vuelva a iniciar sesión.");
        const response = await fetch(`${API}/admin/metricas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) { await signOut(); return; }
        if (!response.ok) throw new Error("No se pudieron cargar las métricas.");
        const data = await response.json();
        if (!active) return;
        setMetricasArea(data.por_area || []);
        setMetricasHospitalEstado(data.por_hospital_estado || []);
        setMetricasAreaDia(data.por_area_dia || []);
        setPromArea(data.promedio_resolucion_area || []);
        setPromHospital(data.promedio_resolucion_hospital || []);
      } catch (err) {
        if (!active) return;
        console.error("Error cargando métricas:", err);
      }
    }
    fetchMetricas();
    return () => { active = false; };
  }, [fechaFin, fechaInicio, getAccessToken, signOut]);

  useEffect(() => { setTmpStart(fechaInicio); setTmpEnd(fechaFin); }, [fechaInicio, fechaFin]);

  const tableWrapper = "mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const fmtLong = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "long", year: "numeric" });
  const parseYMD = (s) => { const [y,m,d] = s.split("-").map(Number); return new Date(y,(m||1)-1,d||1); };

  const isAdmin = usuario?.rol === 'ADMIN';
  const jefeAreaId = !isAdmin ? usuario?.id_area : null;

  function setPreset(preset) {
    const d = new Date();
    const copy = (x) => new Date(x.getTime());
    let a = copy(d), b = copy(d);
    setCustomMode(false);
    if (preset === "today") {
      // a = b = hoy
    } else if (preset === "yesterday") {
      a.setDate(a.getDate()-1); b.setDate(b.getDate()-1);
    } else if (preset === "last7") {
      a.setDate(a.getDate()-6);
    } else if (preset === "last30") {
      a.setDate(a.getDate()-29);
    } else if (preset === "thisMonth") {
      a = new Date(d.getFullYear(), d.getMonth(), 1);
      b = new Date(d.getFullYear(), d.getMonth()+1, 0);
    } else if (preset === "lastMonth") {
      a = new Date(d.getFullYear(), d.getMonth()-1, 1);
      b = new Date(d.getFullYear(), d.getMonth(), 0);
    } else if (preset === "custom") {
      setCustomMode(true);
      return;
    }
    setFechaInicio(toYMD(a)); setFechaFin(toYMD(b)); setRangeOpen(false);
  }

  function applyCustom() {
    if (parseYMD(tmpEnd) < parseYMD(tmpStart)) return alert("Rango inválido");
    setFechaInicio(tmpStart); setFechaFin(tmpEnd); setCustomMode(false); setRangeOpen(false);
  }

  // Agregar cero para áreas e instituciones sin datos
  const tarjetasArea = useMemo(() => {
    const lista = isAdmin ? areas : areas.filter(a => a.id_area === jefeAreaId);
    return lista.map(a => ({
      nombre_area: a.nombre,
      total_solicitudes: metricasArea.find(m => m.nombre_area === a.nombre)?.total_solicitudes || 0,
    }));
  }, [areas, metricasArea, isAdmin, jefeAreaId]);

  const tarjetasInstitucion = useMemo(() => {
    return hospitales.map(h => {
      const registros = metricasHospitalEstado.filter(m => m.nombre_hospital === h.nombre);
      const totalHospital = registros.reduce((sum, m) => sum + m.total_solicitudes, 0);
      return {
        nombre: h.nombre,
        total: totalHospital,
        pendientes: registros.find(m => m.estado === 'pendiente')?.total_solicitudes || 0,
        enProceso: registros.find(m => m.estado === 'en_proceso')?.total_solicitudes || 0,
        cerradas: registros.find(m => m.estado === 'cerrada')?.total_solicitudes || 0,
      };
    });
  }, [hospitales, metricasHospitalEstado]);

  // Gráfico: últimos 15 días desde la fecha fin (incluida)
  const chartDays = useMemo(() => {
    const end = new Date(fechaFin);
    const days = [];
    for (let i = 14; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      days.push(toYMD(d));
    }
    return days;
  }, [fechaFin]);

  const areaNames = useMemo(() => (
    isAdmin ? areas.map(a => a.nombre) : areas.filter(a => a.id_area === jefeAreaId).map(a => a.nombre)
  ), [areas, isAdmin, jefeAreaId]);

  const datosAgrupados = useMemo(() => {
    const base = chartDays.map(d => {
      const row = { dia: d };
      for (const a of areaNames) row[a] = 0;
      return row;
    });
    const indexByDay = Object.fromEntries(base.map((r,i)=>[r.dia,i]));
    for (const m of metricasAreaDia) {
      const d = typeof m.dia === 'string' ? m.dia.slice(0,10) : toYMD(new Date(m.dia));
      const idx = indexByDay[d];
      if (idx === undefined) continue;
      if (!areaNames.includes(m.nombre_area)) continue;
      base[idx][m.nombre_area] = m.total_solicitudes || 0;
    }
    return base;
  }, [chartDays, areaNames, metricasAreaDia]);

  return (
    <div className="flex flex-col gap-4">
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          <div className="relative ml-auto">
            <button
              onClick={() => setRangeOpen(v=>!v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {`${fmtLong.format(parseYMD(fechaInicio))} - ${fmtLong.format(parseYMD(fechaFin))}`}
              <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>

            {rangeOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200">
                {!customMode ? (
                  <div className="py-1">
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("today")}>Hoy</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("yesterday")}>Ayer</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last7")}>Últimos 7 días</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last30")}>Últimos 30 días</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("thisMonth")}>Este mes</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("lastMonth")}>Mes anterior</button>
                    <div className="my-1 border-t border-slate-200" />
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("custom")}>Rango personalizado...</button>
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
          <section className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Métricas</h2>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Área</h3>
              <div className="mt-4 flex flex-wrap gap-5">
                {tarjetasArea.map((m) => (
                  <div key={m.nombre_area} className="w-full flex-1 min-w-[220px] rounded-2xl bg-white px-6 py-5 text-center shadow-md ring-1 ring-slate-200">
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
                {tarjetasInstitucion.map((t) => {
                  const porcentaje = t.total > 0 ? Math.round((t.cerradas / t.total) * 100) : 0;
                  const radius = 15.915;
                  const ringColor = porcentaje >= 66 ? '#10b981' : (porcentaje >= 33 ? '#eab308' : '#ef4444');
                  return (
                    <div key={t.nombre} className="w-full min-w-[260px] flex-1 rounded-2xl bg-white px-6 py-6 text-center shadow-md ring-1 ring-slate-200">
                      <h4 className="text-base font-semibold text-slate-700">{t.nombre}</h4>
                      <h2 className="mt-2 text-3xl font-bold text-slate-900">{t.total}</h2>
                      <div className="mx-auto my-4 h-24 w-24">
                        <svg viewBox="0 0 36 36" className="h-full w-full">
                          <circle cx="18" cy="18" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                          <circle
                            cx="18" cy="18" r={radius} fill="none"
                            stroke={ringColor}
                            strokeWidth="4"
                            strokeDasharray={`${porcentaje}, 100`}
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                          <text x="18" y="20.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
                            {porcentaje}%
                          </text>
                        </svg>
                      </div>
                      <div className="flex justify-around text-sm">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-red-600">{t.pendientes}</span>
                          <span className="font-medium text-red-600">Pendientes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold" style={{color:'#eab308'}}>{t.enProceso}</span>
                          <span className="font-medium" style={{color:'#eab308'}}>En Proceso</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-emerald-600">{t.cerradas}</span>
                          <span className="font-medium text-emerald-600">Cerradas</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Tiempo promedio de resolución (cerradas)</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {isAdmin && (
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h4 className="mb-3 text-base font-semibold text-slate-700">Por Área</h4>
                  <div className={tableWrapper}>
                    <table className="min-w-full border-collapse text-left text-sm text-slate-700">
                      <thead>
                        <tr>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Área</th>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Horas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(isAdmin ? areas : areas.filter(a=> a.id_area===jefeAreaId)).map(a => {
                          const found = promArea.find(p => p.nombre_area === a.nombre);
                          const horas = found ? found.horas : 0;
                          return (
                            <tr key={a.nombre}>
                              <td className="border border-slate-200 px-4 py-2">{a.nombre}</td>
                              <td className="border border-slate-200 px-4 py-2">{horas.toFixed(1)} h</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}

                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h4 className="mb-3 text-base font-semibold text-slate-700">Por Institución</h4>
                  <div className={tableWrapper}>
                    <table className="min-w-full border-collapse text-left text-sm text-slate-700">
                      <thead>
                        <tr>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Institución</th>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Horas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospitales.map(h => {
                          const found = promHospital.find(p => p.nombre_hospital === h.nombre);
                          const horas = found ? found.horas : 0;
                          return (
                            <tr key={h.nombre}>
                              <td className="border border-slate-200 px-4 py-2">{h.nombre}</td>
                              <td className="border border-slate-200 px-4 py-2">{horas.toFixed(1)} h</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Área y Día (últimos 15 días)</h3>
              <div className="mt-4 h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-2 py-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosAgrupados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    {isAdmin && <Legend />}
                    {[...new Set(areaNames)].map((area, index) => (
                      <Bar key={area} dataKey={area} name={area} stackId="a" fill={["#27ae60", "#e67e22", "#3498db", "#9b59b6", "#f1c40f"][index % 5]} />
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
