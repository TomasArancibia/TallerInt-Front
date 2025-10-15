import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function Limpieza() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
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
      </section>
    </main>
  );
}
