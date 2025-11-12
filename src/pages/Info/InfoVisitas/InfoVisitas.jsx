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

export default function InfoVisitas() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
        </div>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_general_visitas"
          trackingCategory="info_visitas"
          trackingCode="info-visitas-general"
        >
          INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_horarios_condiciones"
          trackingCategory="info_visitas"
          trackingCode="info-visitas-horarios-condiciones"
        >
          HORARIOS, CONDICIONES, ELEMENTOS NO PERMITIDOS
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_servicios_visitas"
          trackingCategory="info_visitas"
          trackingCode="info-visitas-servicios"
        >
          SERVICIOS Y APOYO DISPONIBLES PARA VISITAS
        </PortalTrackedLink>
      </section>
    </main>
  );
}
