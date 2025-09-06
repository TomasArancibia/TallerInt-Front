import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoAdministrativa() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <Link className="bot botones_azules" to="/info_administrativa">
        INFORMACIÓN ADMINISTRATIVA A PACIENTES
        </Link>
        <section className="botones">
          <Link className="bot botones_blancos" to="/info_administrativa">
            COSTO DE PRESTACIONES
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            CUENTA HOSPITALARIA Y PAGOS
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            INFORMACIÓN GES-CAEC-LEY DE URGENCIA
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            BENEFICIOS SOCIALES
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            FELICITACIONES
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            SUGERENCIAS
          </Link>
          <Link className="bot botones_blancos" to="/info_administrativa">
            RECLAMOS
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}