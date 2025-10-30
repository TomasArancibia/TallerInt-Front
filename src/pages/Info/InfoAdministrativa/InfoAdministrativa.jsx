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

export default function InfoAdministrativa() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN ADMINISTRATIVA A PACIENTES
        </div>
        <Link className={actionWhite} to="/info_administrativa/ges-caec-ley">
          INFORMACIÓN GES-CAEC-LEY DE URGENCIA
        </Link>
        <Link className={actionWhite} to="/info_administrativa/costos-prestaciones">
          COSTO DE PRESTACIONES
        </Link>
        <Link className={actionWhite} to="/info_administrativa/presupuestos-cuenta">
          PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS
        </Link>
        <Link className={actionWhite} to="/info_administrativa">
          BENEFICIOS SOCIALES / ASISTENCIA SOCIAL
        </Link>
        <Link className={actionWhite} to="/info_administrativa/sugerencias">
          SUGERENCIAS, RECLAMOS Y FELICITACIONES
        </Link>
      </section>
    </main>
  );
}
