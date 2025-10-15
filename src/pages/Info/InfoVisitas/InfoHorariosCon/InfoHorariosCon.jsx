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

export default function InfoHorariosCon() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_visitas" className="mb-4" backLabel="Menú visitas" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>HORARIOS Y CONDICIONES</div>
        <Link className={actionWhite} to="/info_horarios_visitas">
          HORARIOS VISITAS
        </Link>
        <Link className={actionWhite} to="/info_horarios_entrada">
          CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL
        </Link>
      </section>
    </main>
  );
}
