import React, { useEffect, useState } from "react";
import logo from "../assets/logo-ucchristus.png";
import "./Admin.css"

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

  return (
    <div className="admin-view">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <h2 style={{ marginTop: "1rem" }}>Panel de Administración</h2>

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
        </>
      )}
    </div>
  );
}