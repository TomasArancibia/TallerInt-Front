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

export default function InfoVisitas() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
        </div>
        <Link className={actionWhite} to="/info_general_visitas">
          INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS
        </Link>
        <Link className={actionWhite} to="/info_horarios_condiciones">
          HORARIOS, CONDICIONES, ELEMENTOS NO PERMITIDOS
        </Link>
        <Link className={actionWhite} to="/info_servicios_visitas">
          SERVICIOS Y APOYO DISPONIBLES PARA VISITAS
        </Link>
      </section>
    </main>
  );
}
