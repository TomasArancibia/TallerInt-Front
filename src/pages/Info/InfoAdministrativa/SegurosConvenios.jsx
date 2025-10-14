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

export default function SegurosConvenios() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          SEGUROS UC CHRISTUS Y CONVENIOS COMERCIALES
        </div>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PONER TEXTO
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
