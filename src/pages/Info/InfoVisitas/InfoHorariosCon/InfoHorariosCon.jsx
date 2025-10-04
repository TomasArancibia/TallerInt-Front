import React from "react";
import "../../../homepage.css";
import logo from "../../../../assets/logo-ucchristus.png";

import { Link } from "react-router-dom";

export default function InfoHorariosCon() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> HORARIOS Y CONDICIONES </div>
          <Link className="bot botones_blancos" to="/info_horarios_visitas">
            HORARIOS VISITAS
          </Link>
          <Link className="bot botones_blancos" to="/info_horarios_entrada">
            CONDICIONES DE ENTRADA DE VISITAS AL HOSPITAL
          </Link>

          <Link className="bot botones_azules" to="/info_visitas">
            Volver
          </Link>
        </section>
    </div>
  );
}