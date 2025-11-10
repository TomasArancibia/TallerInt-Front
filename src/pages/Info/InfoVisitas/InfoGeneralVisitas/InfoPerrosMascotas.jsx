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

export default function InfoPerrosMascotas() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_general_visitas" className="mb-4" backLabel="Menú acompañantes" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INGRESO PERROS DE ASISTENCIA / MASCOTAS
        </div>
        <Link className={actionWhite} to="/info_visitas/ingreso-perros-asistencia">
          INGRESO PERROS DE ASISTENCIA
        </Link>
        <Link className={actionWhite} to="/info_visitas/ingreso-mascotas">
          INGRESO DE MASCOTAS
        </Link>
      </section>
    </main>
  );
}
