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

export default function AcompanamientoEspiritual() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          ACOMPAÑAMIENTO SOCIAL Y/O ESPIRITUAL
        </div>
        <Link className={actionWhite} to="/acompanamiento_espiritual">
          PREGUNTAR A CONI
        </Link>
        <Link className={actionWhite} to="/acompanamiento_espiritual">
          PREGUNTAR A CONI
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
