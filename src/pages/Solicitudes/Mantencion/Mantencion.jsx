import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function Mantencion() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_morados titulo-estatica"> SOLICITUDES DE MANTENCIÓN</div>
          <Link className="bot botones_blancos" to="/mantencion">
            BAÑO
          </Link>
          <Link className="bot botones_blancos" to="/mantencion">
            CAMA (LUCES, TIMBRE, ETC)
          </Link>
          <Link className="bot botones_blancos" to="/mantencion">
            CLIMATIZACIÓN
          </Link>
          <Link className="bot botones_blancos" to="/mantencion">
            TELEVISOR Y CONTROL REMOTO
          </Link>
          <Link className="bot botones_blancos" to="/mantencion">
            MOBILIARIO DENTRO DE LA HABITACIÓN
          </Link>
          <Link className="bot botones_blancos" to="/mantencion">
            OTRO TIPO DE MANTENCIÓN
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}