import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function SeguridadAsistencial() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
        <section className="botones">
          <div className="bot botones_azules titulo-estatica"> INFORMACIÓN SOBRE SEGURIDAD ASISTENCIAL Y CUIDADOS CLINICOS </div>
          <Link className="bot botones_blancos" to="/seguridad_asistencial">
            CUIDADOS A CONSIDERAR DURANTE LA ESTADÍA
          </Link>
          <Link className="bot botones_blancos" to="/seguridad_asistencial">
            CUIDADOS QUE DEBE CONSIDERAR EL/LA ACOMPAÑANTE
          </Link>
          <Link className="bot botones_blancos" to="/seguridad_asistencial">
            PREVENCIÓN DE CAÍDAS DURANTE HOSPITALIZACIÓN
          </Link>
          <Link className="bot botones_blancos" to="/seguridad_asistencial">
            CUIDADOS AL ALTA
          </Link>
          <Link className="bot botones_blancos" to="/seguridad_asistencial">
            OTROS
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}