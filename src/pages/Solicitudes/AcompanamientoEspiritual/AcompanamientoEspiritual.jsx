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

export default function AcompanamientoEspiritual() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
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
      </section>
    </main>
  );
}
