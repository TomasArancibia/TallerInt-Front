import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

export default function SolicitudGenerica() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    areaName = "Solicitud",
    tipo = "Consulta",
    backHref = "/",
    backLabel = "Volver",
    titulo = areaName,
    apiAreaName,
  } = location.state || {};

  const camaId = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;

  const [step, setStep] = useState("contacto"); // contacto | mensaje
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState({});
  const [mensajeError, setMensajeError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [resultadoEnvio, setResultadoEnvio] = useState(null); // success | fail | null
  const [areas, setAreas] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [error, setError] = useState(null);

  const validarEmail = (value) => /\S+@\S+\.\S+/.test(value);

  useEffect(() => {
    if (!camaId) return;
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
  }, [camaId]);

  const handleVolver = () => {
    if (resultadoEnvio === "success") {
      navigate("/");
      return;
    }
    if (step === "contacto") {
      navigate(backHref);
    } else {
      setStep("contacto");
      setMensaje("");
      setMensajeError(null);
      setResultadoEnvio(null);
    }
  };

  const handleSubmitContacto = (event) => {
    event.preventDefault();
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Escriba nombre y apellido";
    }

    if (!email.trim()) {
      nuevosErrores.email = "Escriba un correo electrónico";
    } else if (!validarEmail(email.trim())) {
      nuevosErrores.email = "Ingrese un correo válido";
    }

    setErrors(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setStep("mensaje");
      setMensajeError(null);
      setResultadoEnvio(null);
    }
  };

  const handleEnviar = async () => {
    if (!mensaje.trim()) {
      setMensajeError("Escriba el detalle de la solicitud antes de enviarla");
      setResultadoEnvio(null);
      return;
    }

    setMensajeError(null);
    setEnviando(true);
    setResultadoEnvio(null);
    try {
      const payload = {
        id_cama: Number(camaId),
        area_nombre: apiAreaName ?? areaName,
        tipo,
        descripcion: mensaje.trim(),
        nombre_solicitante: nombre,
        correo_solicitante: email,
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

  const handleSubmitMensaje = (event) => {
    event.preventDefault();
    handleEnviar();
  };

  if (!camaId) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Para ingresar una solicitud debe escanear primero el QR de su cama o habitación.
        </p>
      </main>
    );
  }

  return (
    <main className={pageContainer}>
      <PageNav
        backHref={step === "contacto" ? backHref : null}
        className="mb-4"
        backLabel={backLabel}
      />
      <Logo />
      <p className={helperText}>Complete los pasos para ingresar su solicitud</p>

      <section className={`${sectionStack} items-center`}>
        <div className={`${actionPurple} pointer-events-none uppercase`}>
          {titulo}
        </div>
        <div className={`${actionWhite} text-xs font-medium text-slate-700 sm:text-sm`}>
          Área seleccionada: {areaName} — Tipo: {tipo}
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <span
            className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
              step === "contacto"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            Paso 1: Datos de contacto
          </span>
          <span
            className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
              step === "mensaje"
                ? "bg-purple-700 text-white shadow-sm"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            Paso 2: Detalle de solicitud
          </span>
        </div>

        {step === "contacto" ? (
          <form
            className="w-full max-w-2xl space-y-4 rounded-2xl border border-purple-200 bg-white px-6 py-6 text-left shadow-sm"
            onSubmit={handleSubmitContacto}
          >
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700">
                Nombre y Apellido *
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="Ej: María López"
                disabled={resultadoEnvio === "success"}
                required
              />
              {errors.nombre ? (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.nombre}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="nombre@correo.cl"
                required
              />
              {errors.email ? (
                <p className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleVolver}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {resultadoEnvio === "success" ? "Volver al inicio" : "Volver"}
              </button>
              <button
                type="submit"
                className={`${actionPurple} w-auto px-6 py-2 text-sm sm:text-base`}
              >
                Continuar
              </button>
            </div>
          </form>
        ) : null}

        {step === "mensaje" ? (
          <form
            className="w-full max-w-2xl space-y-4 rounded-2xl border border-purple-200 bg-white px-6 py-6 text-left shadow-sm"
            onSubmit={handleSubmitMensaje}
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <p className="font-semibold text-slate-700">Datos de contacto</p>
              <p>Nombre: {nombre}</p>
              <p>Correo: {email}</p>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-700">
                Describe tu solicitud *
              </label>
              <textarea
                id="mensaje"
                rows="8"
                value={mensaje}
                onChange={(event) => setMensaje(event.target.value)}
                className="mt-1 w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="Escriba aquí los detalles de su solicitud"
                required
              />
            </div>

            {mensajeError ? (
              <p className="text-xs font-medium text-red-600">{mensajeError}</p>
            ) : null}

            {false && (
              <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                Conectando al backend…
              </div>
            )}
            {false && (
              <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                Backend OK. Áreas: {areas.map((a) => a.nombre).join(", ")}
              </div>
            )}
            {false && (
              <div className="w-full rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm text-red-600 shadow-sm">
                Error al conectar: {error}
              </div>
            )}
            {resultadoEnvio === "success" && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Solicitud enviada correctamente
              </div>
            )}
            {resultadoEnvio === "fail" && (
              <div className="rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-red-600 shadow-sm">
                Error al enviar la solicitud
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={handleVolver}
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Volver
              </button>
              <button
                type="submit"
                className={`${actionPurple} w-auto px-6 py-2 text-sm sm:text-base disabled:cursor-not-allowed disabled:opacity-60`}
                disabled={enviando || resultadoEnvio === "success"}
              >
                {enviando ? "Enviando…" : "Enviar solicitud"}
              </button>
            </div>
          </form>
        ) : null}
      </section>
    </main>
  );
}
