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

export default function InfoPerrosMascotas() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_general_visitas" className="mb-4" backLabel="Menú acompañantes" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INGRESO PERROS DE ASISTENCIA / MASCOTAS
        </div>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/ingreso-perros-asistencia"
          trackingCategory="info_visitas_mascotas"
          trackingCode="info-visitas-ingreso-perros-asistencia"
        >
          INGRESO PERROS DE ASISTENCIA
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/ingreso-mascotas"
          trackingCategory="info_visitas_mascotas"
          trackingCode="info-visitas-ingreso-mascotas"
        >
          INGRESO DE MASCOTAS
        </PortalTrackedLink>
      </section>
    </main>
  );
}
