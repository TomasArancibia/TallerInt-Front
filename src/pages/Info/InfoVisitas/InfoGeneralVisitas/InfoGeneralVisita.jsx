import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
} from "../../../../components/ui.js";

export default function InfoGeneralVisita() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
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
        <Link className={actionBlue} to="/info_visitas">
          Volver
        </Link>
      </section>
    </main>
  );
}
