import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Logo } from "../../components/ui.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Dashboard() {
  const [hospitales, setHospitales] = useState([]);
  const [habitaciones, setHabitaciones] = useState({});
  const [camas, setCamas] = useState({});
  const [solicitudes, setSolicitudes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("2025-01-01");
  const [fechaFin, setFechaFin] = useState("2025-12-31");
  // Metricas
  const [metricasArea, setMetricasArea] = useState([]);
  const [metricasHospitalEstado, setMetricasHospitalEstado] = useState([]);
  const [metricasAreaDia, setMetricasAreaDia] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setStatus("loading");
      try {
        const [hospRes, habRes, camasRes, areasRes, solicitudesRes] = await Promise.all([
          fetch(`${API}/hospitales`),
          fetch(`${API}/habitaciones`),
          fetch(`${API}/camas`),
          fetch(`${API}/areas`),
          fetch(`${API}/solicitudes`)
        ]);
        if (!hospRes.ok || !habRes.ok || !camasRes.ok || !areasRes.ok || !solicitudesRes.ok)
          throw new Error("Error al conectar con el backend");

        const hospitalesData = await hospRes.json();
        const habitacionesData = await habRes.json();
        const camasData = await camasRes.json();
        const areasData = await areasRes.json();
        const solicitudesData = await solicitudesRes.json();

        setHospitales(hospitalesData);
        setHabitaciones(habitacionesData);
        setCamas(camasData);
        setAreas(areasData);
        setSolicitudes(solicitudesData);
        setStatus("ok");
      } catch (err) {
        setError(err.message);
        setStatus("error");
      }
    }

    fetchData();
  }, []);


  useEffect(() => {
    async function fetchMetricas() {
      if (new Date(fechaFin) < new Date(fechaInicio)) {
      alert("Fecha inválida");
      return;
    }
      try {
        const [areaRes, hospEstadoRes, areaDiaRes] = await Promise.all([
          fetch(`${API}/metricas/solicitudes-por-area?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
          fetch(`${API}/metricas/solicitudes-por-hospital-estado?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
          fetch(`${API}/metricas/solicitudes-por-area-dia?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`)
        ]);

        const [areaData, hospEstadoData, areaDiaData] = await Promise.all([
          areaRes.json(),
          hospEstadoRes.json(),
          areaDiaRes.json()
        ]);

        setMetricasArea(areaData.metricas || areaData);
        setMetricasHospitalEstado(hospEstadoData.metricas || hospEstadoData);
        setMetricasAreaDia(areaDiaData.metricas || areaDiaData);
      } catch (err) {
        console.error("Error cargando metricas:", err);
      }
    }
  
    fetchMetricas();
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

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 rounded-2xl bg-slate-900 px-6 py-5 text-slate-50 shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-12 w-auto rounded-lg bg-white p-2" />
          <h1 className="text-xl font-semibold">Dashboard de Solicitudes</h1>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-2 text-slate-800 shadow-sm">
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <span className="text-sm text-slate-500">a</span>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
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
                    <th className={headerCell}>Número</th>
                    <th className={headerCell}>ID Hospital</th>
                  </tr>
                </thead>
                <tbody>
                  {habitaciones.map((hab) => (
                    <tr key={hab.id_habitacion}>
                      <td className={dataCell}>{hab.id_habitacion}</td>
                      <td className={dataCell}>{hab.numero}</td>
                      <td className={dataCell}>{hab.id_hospital}</td>
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
                      <td className={dataCell}>{s.estado}</td>
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
                    key={m.id_area}
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

                  const totalHospital = datosHospital.reduce(
                    (sum, m) => sum + m.total_solicitudes,
                    0
                  );
                  const pendientes =
                    datosHospital.find((m) => m.estado === "pendiente")?.total_solicitudes || 0;
                  const enProceso =
                    datosHospital.find((m) => m.estado === "en_proceso")?.total_solicitudes || 0;
                  const resueltos =
                    datosHospital.find((m) => m.estado === "resuelto")?.total_solicitudes || 0;

                  const porcentaje =
                    totalHospital > 0 ? Math.round((resueltos / totalHospital) * 100) : 0;

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
                          <span className="text-lg font-bold text-slate-900">{resueltos}</span>
                          <span>Resueltos</span>
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
