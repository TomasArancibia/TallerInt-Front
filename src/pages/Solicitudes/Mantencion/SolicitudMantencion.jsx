import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo-ucchristus.png";
import { Link, useLocation } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  actionBlue,
} from "../../../components/ui.js";

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
    } catch (err) {
      console.error("Error al enviar la solicitud", err);
      setResultadoEnvio("fail");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={`${sectionStack} items-center`}>
        <div className={`${actionPurple} pointer-events-none`}>
          SOLICITUDES DE MANTENCIÓN
        </div>
        <div className={`${actionWhite} text-xs font-medium text-slate-700 sm:text-sm`}>
          Área seleccionada: {areaName} — Tipo: {tipo}
        </div>

        <textarea
          className="w-full max-w-2xl rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
          name="mensaje"
          rows="8"
          placeholder="Escriba aquí su solicitud"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />

        {/* Estado de conexión con el backend */}
        {status === "loading" && (
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Conectando al backend…
          </div>
        )}
        {status === "ok" && (
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            Backend OK. Áreas: {areas.map((a) => a.nombre).join(", ")}
          </div>
        )}
        {status === "error" && (
          <div className="w-full max-w-2xl rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm text-red-600 shadow-sm">
            Error al conectar: {error}
          </div>
        )}
        {resultadoEnvio === "success" && (
          <div className="w-full max-w-2xl rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-600 shadow-sm">
            Solicitud enviada correctamente
          </div>
        )}
        {resultadoEnvio === "fail" && (
          <div className="w-full max-w-2xl rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm text-red-600 shadow-sm">
            Error al enviar la solicitud
          </div>
        )}

        <button
          className={`${actionPurple} w-full max-w-2xl disabled:cursor-not-allowed disabled:opacity-60`}
          onClick={handleEnviar}
          disabled={enviando}
        >
          {enviando ? "Enviando…" : "Enviar"}
        </button>
        <Link className={`${actionBlue} w-full max-w-2xl`} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
