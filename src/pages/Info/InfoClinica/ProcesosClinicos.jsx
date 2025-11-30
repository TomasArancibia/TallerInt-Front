import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";
import PortalTrackedLink from "../../../components/PortalTrackedLink.jsx";

export default function ProcesosClinicos() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </div>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/numero-episodio"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-numero-episodio"
        >
          NÚMERO DE EPISODIO
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/resultados"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-resultados"
        >
          RESULTADOS DE EXÁMENES, RECETAS, ÓRDENES MÉDICAS
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/documentacion"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-documentacion"
        >
          DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, PROTOCOLOS OPERATORIOS, ETC)
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/info-diagnostico"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-info-diagnostico"
        >
          INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/cita-post"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-cita-post"
        >
          ¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/procesosclinicos/horarios-banco"
          trackingCategory="info_procesos_clinicos"
          trackingCode="info-procesos-horarios-banco"
        >
          HORARIO VISITAS Y BANCO SANGRE
        </PortalTrackedLink>
      </section>
    </main>
  );
}
