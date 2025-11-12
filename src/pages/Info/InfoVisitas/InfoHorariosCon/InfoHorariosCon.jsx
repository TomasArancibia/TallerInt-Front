import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";
import PortalTrackedLink from "../../../../components/PortalTrackedLink.jsx";

export default function InfoHorariosCon() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_visitas" className="mb-4" backLabel="Menú visitas" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>HORARIOS Y CONDICIONES</div>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_horarios_visitas"
          trackingCategory="info_visitas_horarios"
          trackingCode="info-visitas-horarios-visitas"
        >
          HORARIOS VISITAS
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_horarios_entrada"
          trackingCategory="info_visitas_horarios"
          trackingCode="info-visitas-horarios-entrada"
        >
          CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/elementos-permitidos"
          trackingCategory="info_visitas_horarios"
          trackingCode="info-visitas-horarios-elementos"
        >
          ELEMENTOS NO PERMITIDOS AL INGRESO DEL HOSPITAL
        </PortalTrackedLink>
      </section>
    </main>
  );
}
