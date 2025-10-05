import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoVisitas() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS </div>
          <Link className="bot botones_blancos" to="/info_general_visitas">
            INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS
          </Link>
          <Link className="bot botones_blancos" to="/info_horarios_condiciones">
            HORARIOS Y CONDICIONES
          </Link>
          <Link className="bot botones_blancos" to="/info_servicios_visitas">
            SERVICIOS Y APOYO DISPONIBLES PARA VISITAS
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}