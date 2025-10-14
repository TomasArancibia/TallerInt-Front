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

export default function ProcesosClinicos() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </div>
        <Link className={actionWhite} to="/procesosclinicos/resultados">
          RESULTADOS DE EXÁMENES (LABORATORIO E IMÁGENES)
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/documentacion">
          DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, PROTOCOLOS OPERATORIOS, ETC)
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/info-diagnostico">
          INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/cita-post">
          ¿DONDE AGENDO UNA CITA POST HOSPITALIZACIÓN?
        </Link>
        <Link className={actionWhite} to="/procesosclinicos/horarios-banco">
          HORARIO VISITAS Y BANCO SANGRE
        </Link>
        <Link className={actionWhite} to="/procesosclinicos">
          PROCESOS DE ALTA
        </Link>
        <Link className={actionBlue} to="/">
          Volver
        </Link>
      </section>
    </main>
  );
}
