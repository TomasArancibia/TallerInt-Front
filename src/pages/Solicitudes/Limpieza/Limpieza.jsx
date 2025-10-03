import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function Limpieza() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_morados titulo-estatica"> SOLICITUD DE LIMPIEZA </div>
          <Link className="bot botones_blancos" to="/limpieza">
            BAÑO
          </Link>
          <Link className="bot botones_blancos" to="/limpieza">
            HABITACIÓN
          </Link>
          <Link className="bot botones_blancos" to="/limpieza">
            OTRO
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}