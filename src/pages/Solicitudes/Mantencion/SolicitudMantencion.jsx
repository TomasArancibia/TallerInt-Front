import React, { useEffect, useState } from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link, useLocation } from "react-router-dom";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function SolicitudMantencion() {
  const location = useLocation();
  const { areaName = "Mantención", tipo = "MANTENCIÓN" } = location.state || {};

  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [resultadoEnvio, setResultadoEnvio] = useState(null); // success | fail | null

  useEffect(() => {
    setStatus("loading");
    fetch(`${API}/areas`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAreas(data);
        setStatus("ok");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  const handleEnviar = async () => {
    setEnviando(true);
    setResultadoEnvio(null);
    try {
      const payload = {
        id_cama: Number(sessionStorage.getItem("id_cama")), // del QR validado
        area_nombre: areaName,                               // ✅ backend resuelve el id
        tipo,                                               // subcategoría elegida
        descripcion: mensaje || "",
      };

      const res = await fetch(`${API}/solicitudes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();

      setResultadoEnvio("success");
      setMensaje("");
    } catch (e) {
      setResultadoEnvio("fail");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
        <div className="bot botones_morados titulo-estatica"> SOLICITUDES DE MANTENCIÓN</div>
        <div className="bot" style={{ marginBottom: 6 }}>
          Área seleccionada: {areaName} — Tipo: {tipo}
        </div>

        <textarea
          className="text-area"
          name="mensaje"
          rows="10"
          cols="30"
          placeholder="Escriba aquí su solicitud"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>

        {/* Estado de conexión con el backend */}
        {status === "loading" && (
          <div className="bot" style={{ marginTop: 8 }}>Conectando al backend…</div>
        )}
        {status === "ok" && (
          <div className="bot" style={{ marginTop: 8 }}>
            Backend OK. Áreas: {areas.map((a) => a.nombre).join(", ")}
          </div>
        )}
        {status === "error" && (
          <div className="bot" style={{ marginTop: 8, color: "#b00020" }}>
            Error al conectar: {error}
          </div>
        )}
        {resultadoEnvio === "success" && (
          <div className="bot" style={{ marginTop: 8, color: "#0a7c2f" }}>
            Solicitud enviada correctamente
          </div>
        )}
        {resultadoEnvio === "fail" && (
          <div className="bot" style={{ marginTop: 8, color: "#b00020" }}>
            Error al enviar la solicitud
          </div>
        )}

        <br />
        <button className="bot botones_morados" onClick={handleEnviar} disabled={enviando}>
          {enviando ? "Enviando…" : "Enviar"}
        </button>
        <Link className="bot botones_azules" to="/">Volver</Link>
      </section>
    </div>
  );
}
