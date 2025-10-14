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

export default function InfoAdministrativa() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN ADMINISTRATIVA A PACIENTES
        </div>
        <Link className={actionWhite} to="/info_administrativa">
          INFORMACIÓN GES-CAEC-LEY DE URGENCIA
        </Link>
        <Link className={actionWhite} to="/info_administrativa">
          COSTO DE PRESTACIONES
        </Link>
        <Link className={actionWhite} to="/info_administrativa">
          PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS
        </Link>
        <Link className={actionWhite} to="/info_administrativa">
          BENEFICIOS SOCIALES / ASISTENCIA SOCIAL
        </Link>
        <Link className={actionWhite} to="/info_administrativa">
          SUGERENCIAS, RECLAMOS Y FELICITACIONES
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
