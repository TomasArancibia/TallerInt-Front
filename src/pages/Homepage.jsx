import React from "react";
import { useNavigate } from "react-router-dom";
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
import PortalTrackedLink from "../components/PortalTrackedLink.jsx";
import { trackPortalButtonClick } from "../utils/portalTracking";

export default function Homepage() {
  const navigate = useNavigate();

  // Si vienes desde /landing con QR válido, estos valores existen
  const camaId = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;
  const qrCode = typeof window !== "undefined" ? sessionStorage.getItem("qr_code") : null;

  // 👉 Este bloque debe estar fuera de handleAskQuestion
  if (!camaId) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Para continuar, escanee el código QR disponible en su habitación. Una vez validado,
          verá aquí el menú de solicitudes e información.
        </p>
      </main>
    );
  }

  // Interacción con asistente virtual pasa por un botón que navega a /chatbot
  function goToChatbot() {
    trackPortalButtonClick({
      buttonCode: "homepage-asistente-virtual",
      buttonLabel: "Asistente virtual",
      categoria: "asistente_virtual",
      targetPath: "/chatbot",
      sourcePath: window.location?.pathname,
    });
    navigate("/chatbot");
  }

  return (
    <main className={pageContainer}>
      <div className="relative w-full max-w-3xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <button
          type="button"
          onClick={goToChatbot}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-purple-700 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-700 shadow-sm transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:absolute sm:mt-0 sm:w-auto sm:-right-8 sm:top-2"
        >
          <FontAwesomeIcon icon={faComments} className="text-sm" />
          <span>Asistente virtual</span>
        </button>
      </div>

      {/* Aviso pequeño (solo se muestra si hay QR/cama en sesión) */}
      {camaId && (
        <div className="mt-2 mb-2 inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Operando para <strong>cama ID {camaId}</strong>
          {qrCode ? ` (QR: ${qrCode})` : ""}
        </div>
      )}

      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>

      <section className={sectionStack}>
        <h2 className="mt-0 text-center text-base font-semibold text-slate-900">
          Informaciones
        </h2>
        <PortalTrackedLink
          className={actionBlue}
          to="/procesosclinicos"
          trackingCategory="info"
          trackingCode="homepage-info-procesosclinicos"
        >
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionBlue}
          to="/info_administrativa"
          trackingCategory="info"
          trackingCode="homepage-info-administrativa"
        >
          INFORMACIÓN ADMINISTRATIVA, PAGOS Y BENEFICIOS SOCIALES
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionBlue}
          to="/info_visitas"
          trackingCategory="info"
          trackingCode="homepage-info-visitas"
        >
          ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES
        </PortalTrackedLink>

        <h2 className="mt-6 text-center text-base font-semibold text-slate-900">
          Solicitudes
        </h2>
        <PortalTrackedLink
          className={actionPurple}
          to="/mantencion"
          trackingCategory="solicitud"
          trackingCode="homepage-solicitud-mantencion"
        >
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/nutricion_y_alimentacion"
          trackingCategory="solicitud"
          trackingCode="homepage-solicitud-nutricion"
        >
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/limpieza"
          trackingCategory="solicitud"
          trackingCode="homepage-solicitud-limpieza"
        >
          LIMPIEZA DE HABITACIÓN, BAÑO O BOX
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/asistencia_social"
          trackingCategory="solicitud"
          trackingCode="homepage-solicitud-asistencia-social"
        >
          ASISTENCIA SOCIAL
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/acompanamiento_espiritual"
          trackingCategory="solicitud"
          trackingCode="homepage-solicitud-acompanamiento-espiritual"
        >
          ACOMPAÑAMIENTO ESPIRITUAL
        </PortalTrackedLink>

      </section>
    </main>
  );
}
