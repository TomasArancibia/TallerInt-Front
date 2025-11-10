import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionPurple,
  Logo,
} from "../components/ui.jsx";

export default function Homepage() {
  // Si vienes desde /landing con QR válido, estos valores existen
  const camaId = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;
  const qrCode = typeof window !== "undefined" ? sessionStorage.getItem("qr_code") : null;

  return (
    <main className={pageContainer}>
      <div className="flex w-full max-w-3xl items-center justify-between">
        <Logo />
        <a
          href="respuesta.html"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-white shadow-md transition hover:bg-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-label="Abrir chatbot"
          title="Abrir chatbot"
        >
          <FontAwesomeIcon icon={faComments} />
        </a>
      </div>

      {/* Aviso pequeño (solo se muestra si hay QR/cama en sesión) */}
      {camaId && (
        <div className="mt-2 mb-2 inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Operando para <strong>cama ID {camaId}</strong>{qrCode ? ` (QR: ${qrCode})` : ""}
        </div>
      )}

      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>

      <section className={sectionStack}>
        <h2 className="mt-0 text-center text-base font-semibold text-slate-900">Informaciones</h2>
        <Link className={actionBlue} to="/procesosclinicos">
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </Link>
        <Link className={actionBlue} to="/info_administrativa">
          INFORMACIÓN ADMINISTRATIVA, PAGOS Y BENEFICIOS SOCIALES
        </Link>
        <Link className={actionBlue} to="/info_visitas">
          ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES
        </Link>

        <h2 className="mt-6 text-center text-base font-semibold text-slate-900">Solicitudes</h2>
        <Link className={actionPurple} to="/mantencion">
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </Link>
        <Link className={actionPurple} to="/nutricion_y_alimentacion">
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </Link>
        <Link className={actionPurple} to="/limpieza">
          LIMPIEZA DE HABITACIÓN, BAÑO O BOX
        </Link>
        <Link className={actionPurple} to="/asistencia_social">
          ASISTENCIA SOCIAL
        </Link>
        <Link className={actionPurple} to="/acompanamiento_espiritual">
          ACOMPAÑAMIENTO ESPIRITUAL
        </Link>

      </section>
    </main>
  );
}
