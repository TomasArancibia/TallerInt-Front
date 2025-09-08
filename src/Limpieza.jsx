import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function Limpieza() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> LIMPIEZA DE HABITACIÓN, BAÑO O BOX </div>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PONER TEXTO
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}