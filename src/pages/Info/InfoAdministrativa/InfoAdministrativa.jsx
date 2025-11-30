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

export default function InfoAdministrativa() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN ADMINISTRATIVA A PACIENTES
        </div>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_administrativa/ges-caec-ley"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-ges-caec-ley"
        >
          INFORMACIÓN GES-CAEC-LEY DE URGENCIA
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_administrativa/costos-prestaciones"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-costos-prestaciones"
        >
          COSTO DE PRESTACIONES
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_administrativa/presupuestos-cuenta"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-presupuestos-cuenta"
        >
          PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_administrativa/sugerencias"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-sugerencias"
        >
          SUGERENCIAS, RECLAMOS Y FELICITACIONES
        </PortalTrackedLink>
      </section>
    </main>
  );
}
