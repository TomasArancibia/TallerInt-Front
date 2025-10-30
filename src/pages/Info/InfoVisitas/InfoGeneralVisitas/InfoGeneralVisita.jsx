import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

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
        <Link className={actionWhite} to="/info_dif_vis_aco">
          DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA
        </Link>
        <Link className={actionWhite} to="/info_rol_resp">
          ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE
        </Link>
        <Link className={actionWhite} to="/info_rol_pagare">
          DIFERENCIA ENTRE RESPONSABLE DE PAGARÉ Y ACOMPAÑANTE
        </Link>
      </section>
    </main>
  );
}
