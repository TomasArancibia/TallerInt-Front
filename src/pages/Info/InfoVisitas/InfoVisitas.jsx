import React from "react";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
} from "../../../components/ui.js";

export default function InfoVisitas() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
        </div>
        <Link className={actionWhite} to="/info_general_visitas">
          INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS
        </Link>
        <Link className={actionWhite} to="/info_horarios_condiciones">
          HORARIOS Y CONDICIONES
        </Link>
        <Link className={actionWhite} to="/info_servicios_visitas">
          SERVICIOS Y APOYO DISPONIBLES PARA VISITAS
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
