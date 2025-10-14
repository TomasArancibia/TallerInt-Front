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

export default function InfoHorariosCon() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>HORARIOS Y CONDICIONES</div>
        <Link className={actionWhite} to="/info_horarios_visitas">
          HORARIOS VISITAS
        </Link>
        <Link className={actionWhite} to="/info_horarios_entrada">
          CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL
        </Link>

        <Link className={actionBlue} to="/info_visitas">
          Volver
        </Link>
      </section>
    </main>
  );
}
