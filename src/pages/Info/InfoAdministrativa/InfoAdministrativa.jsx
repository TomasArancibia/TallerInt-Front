import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoAdministrativa() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
        <section className="botones">
        <div className="bot botones_azules titulo-estatica"> INFORMACIÓN ADMINISTRATIVA A PACIENTES </div>
          <Link className="bot botones_blancos" to="/info_administrativa">
            INFORMACIÓN GES-CAEC-LEY DE URGENCIA
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            COSTO DE PRESTACIONES
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            PRESUPUESTOS, CUENTA HOSPITALARIA, PAGOS
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            BENEFICIOS SOCIALES / ASISTENCIA SOCIAL
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            SUGERENCIAS, RECLAMOS Y FELICITACIONES
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}