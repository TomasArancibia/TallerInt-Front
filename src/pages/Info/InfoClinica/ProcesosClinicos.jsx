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

export default function ProcesosClinicos() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </div>
        <Link className={actionWhite} to="/procesosclinicos/numero-episodio">
          NÚMERO DE EPISODIO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/resultados">
          RESULTADOS DE EXÁMENES, RECETAS, ÓRDENES MÉDICAS
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/documentacion">
          DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, PROTOCOLOS OPERATORIOS, ETC)
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/info-diagnostico">
          INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/cita-post">
          ¿DÓNDE AGENDO UNA CITA POST HOSPITALIZACIÓN?
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/horarios-banco">
          HORARIO VISITAS Y BANCO SANGRE
        </Link>
      </section>
    </main>
  );
}
