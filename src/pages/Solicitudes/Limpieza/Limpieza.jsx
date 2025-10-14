import React from "react";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  actionBlue,
} from "../../../components/ui.js";

export default function Limpieza() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>SOLICITUD DE LIMPIEZA</div>
        <Link className={actionWhite} to="/limpieza">
          BAÑO
        </Link>
        <Link className={actionWhite} to="/limpieza">
          HABITACIÓN
        </Link>
        <Link className={actionWhite} to="/limpieza">
          OTRO
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
