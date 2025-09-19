import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function NutricionAlimentacion() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_morados titulo-estatica"> NUTRICIÓN Y ALIMENTACIÓN A PACIENTES </div>
          <Link className="bot botones_blancos" to="/nutricion_y_alimentacion">
            PREGUNTAR A CONI
          </Link>
          <Link className="bot botones_blancos" to="/nutricion_y_alimentacion">
            PREGUNTAR A CONI
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}