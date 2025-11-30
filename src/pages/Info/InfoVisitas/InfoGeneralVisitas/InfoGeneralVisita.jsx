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

export default function InfoGeneralVisita() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_visitas" className="mb-4" backLabel="Menú visitas" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS
        </div>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_dif_vis_aco"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-diferencia"
        >
          DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_rol_resp"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-rol-resp"
        >
          ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_rol_pagare"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-rol-pagare"
        >
          ROL DEL RESPONSABLE DEL PAGARÉ
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/cuidador-externo"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-cuidador-externo"
        >
          CUIDADOR DE EMPRESA EXTERNA
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/ley-mila"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-ley-mila"
        >
          LEY MILA N°21.372
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionWhite}
          to="/info_visitas/perros-mascotas"
          trackingCategory="info_visitas_general"
          trackingCode="info-visitas-general-perros-mascotas"
        >
          INGRESO PERROS DE ASISTENCIA / MASCOTAS
        </PortalTrackedLink>
      </section>
    </main>
  );
}
