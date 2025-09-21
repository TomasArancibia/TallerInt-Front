import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function SolicitudMantencion() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_morados titulo-estatica"> SOLICITUDES DE MANTENCIÓN</div>
          hacer un cuadro de texto
          <textarea
            className="text-area"
            name="mensaje"
            rows="10"
            cols="30"
            placeholder="Escriba aquí su solicitud"
          ></textarea>
          <br />
          <Link className="bot botones_morados" to="/solicitudmantencion">
            Enviar
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}