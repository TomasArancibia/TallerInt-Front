import React, { useEffect, useState } from "react";
import logo from "../assets/logo-ucchristus.png";
import "./Admin.css"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function Admin() {
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
  const [metricasHospitalArea, setMetricasHospitalArea] = useState([]);

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
        const [areaRes, hospEstadoRes, areaDiaRes, hospAreaRes] = await Promise.all([
          fetch(`${API}/metricas/solicitudes-por-area?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
          fetch(`${API}/metricas/solicitudes-por-hospital-estado?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
          fetch(`${API}/metricas/solicitudes-por-area-dia?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`),
          fetch(`${API}/metricas/solicitudes-por-hospital-area?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`)
        ]);

        const [areaData, hospEstadoData, areaDiaData, hospAreaData] = await Promise.all([
          areaRes.json(),
          hospEstadoRes.json(),
          areaDiaRes.json(),
          hospAreaRes.json()
        ]);

        setMetricasArea(areaData.metricas || areaData);
        setMetricasHospitalEstado(hospEstadoData.metricas || hospEstadoData);
        setMetricasAreaDia(areaDiaData.metricas || areaDiaData);
        setMetricasHospitalArea(hospAreaData.metricas || hospAreaData);
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

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>UC Solicitudes</h3>
        </div>
        <nav className="sidebar-menu">
          <button className="menu-item active">Dashboard</button>
          <button className="menu-item">Solicitudes</button>
          <button className="menu-item">Ubicaciones</button>
          <button className="menu-item">Áreas de Solicitudes</button>
          <button className="menu-item">Usuarios</button>
        </nav>
      </aside>

    <div className="admin-view">
      <header className="admin-header">
        <div className="header-left">
          <img src={logo} alt="Logo UC Christus" className="logo" />
          <h1>Dashboard de Solicitudes</h1>
        </div>

        <div className="header-right">
          <div className="filtro-fechas">
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <span style={{ margin: "0 0.5rem" }}>a</span>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
        </div>
      </header>

      {status === "loading" && <p>Cargando datos...</p>}
      {status === "error" && <p style={{ color: "#b00020" }}>Error: {error}</p>}
      {status === "ok" && (
        <>
          {/* HOSPITALES */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Hospitales</h3>
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID Hospital</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {hospitales.map((h) => (
                  <tr key={h.id_hospital}>
                    <td>{h.id_hospital}</td>
                    <td>{h.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* HABITACIONES */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Habitaciones</h3>
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID Habitación</th>
                  <th>Número</th>
                  <th>ID Hospital</th>
                </tr>
              </thead>
              <tbody>
                {habitaciones.map((hab) => (
                  <tr key={hab.id_habitacion}>
                    <td>{hab.id_habitacion}</td>
                    <td>{hab.numero}</td>
                    <td>{hab.id_hospital}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* CAMAS */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Camas</h3>
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID Cama</th>
                  <th>Identificador QR</th>
                  <th>ID Habitación</th>
                </tr>
              </thead>
              <tbody>
                {camas.map((c) => (
                  <tr key={c.id_cama}>
                    <td>{c.id_cama}</td>
                    <td>{c.qr}</td>
                    <td>{c.id_habitacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ÁREAS */}
          <section style={{ marginTop: "2rem" }}>
            <h3>Áreas</h3>
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID Área</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((a) => (
                  <tr key={a.id_area}>
                    <td>{a.id_area}</td>
                    <td>{a.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* SOLICITUDES */}
          <section style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <h3>Solicitudes</h3>
            <table className="tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ID Cama</th>
                  <th>Área</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.id_cama}</td>
                    <td>{areas.find((a) => a.id_area === s.id_area)?.nombre || "—"}</td>
                    <td>{s.tipo}</td>
                    <td>{s.descripcion}</td>
                    <td>{s.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        {/* MÉTRICAS */}  
        <section className="metricas-dashboard">
          <h2 className="metricas-title">Métricas</h2>

          {/*Totales por Área*/}
          <div className="metricas-areas">
            <h3>Totales por Área</h3>
            <div className="metricas-areas-grid">
              {metricasArea.map((m) => (
                <div key={m.id_area} className="metrica-area-card">
                  <h4>{m.nombre_area}</h4>
                  <p>{m.total_solicitudes}</p>
                </div>
              ))}
            </div>
          </div>

          {/*Totales por Hospital y Estado*/}
          <div className="metricas-hospital">
            <h3>Totales por Institución</h3>
            <p className="metricas-hospital-subtitle">
              Total general: {metricasHospitalEstado.reduce((sum, m) => sum + m.total_solicitudes, 0)}
            </p>

            <div className="metricas-hospital-grid">
              {Array.from(
                new Set(metricasHospitalEstado.map((m) => m.nombre_hospital))
              ).map((hospital) => {
                const datosHospital = metricasHospitalEstado.filter(
                  (m) => m.nombre_hospital === hospital
                );

                const totalHospital = datosHospital.reduce(
                  (sum, m) => sum + m.total_solicitudes,
                  0
                );
                const pendientes = datosHospital.find((m) => m.estado === "pendiente")?.total_solicitudes || 0;
                const enProceso = datosHospital.find((m) => m.estado === "en_proceso")?.total_solicitudes || 0;
                const resueltos = datosHospital.find((m) => m.estado === "resuelto")?.total_solicitudes || 0;

                // Porcentaje de resueltos
                const porcentaje = totalHospital > 0 ? Math.round((resueltos / totalHospital) * 100) : 0;

                return (
                  <div key={hospital} className="metricas-hospital-card">
                    <h4>{hospital}</h4>
                    <h2>{totalHospital}</h2>
                    <div className="circle">
                      <div className="circle-inner">
                        <span>{porcentaje}%</span>
                      </div>
                    </div>
                    <div className="hospital-estados">
                      <div className="hospital-estado-item">
                        <span className="hospital-estado-num">{pendientes}</span>
                        <span className="estado-label estado-pendiente">Pendientes</span>
                      </div>
                      <div className="hospital-estado-item">
                        <span className="hospital-estado-num">{enProceso}</span>
                        <span className="estado-label estado-enproceso">En Proceso</span>
                      </div>
                      <div className="hospital-estado-item">
                        <span className="hospital-estado-num">{resueltos}</span>
                        <span className="estado-label estado-resuelto">Resueltos</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/*Totales por Área y día*/}
          <div className="metricas-area-dia">
            <h3>Totales por Área y Día (Últimos 15 días)</h3>
            <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosAgrupados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/*Hacer una barra por cada área*/}
                {[...new Set(metricasUltimosDias.map(m => m.nombre_area))].map((area, index) => (
                  <Bar key={area} dataKey={area} name={area} stackId="a"
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
  </div>
  );
}