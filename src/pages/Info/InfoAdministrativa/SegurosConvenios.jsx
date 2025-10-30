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
} from "../../../components/ui.jsx";

export default function SegurosConvenios() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
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
      </section>
    </main>
  );
}
