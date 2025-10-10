import React from "react";
import { Link } from "react-router-dom";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";

export default function CitaPostHospitalizacion() {
  return (
    <div className="app vista">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <div className="bot botones_azules titulo-estatica">CITA POST HOSPITALIZACIÓN</div>

      <div className="contenido centrar">
        <h2 className="titulo">¿Dónde agendo una cita post hospitalización?</h2>

        <div className="bloque">
          <p>
            Tras el alta, el hospital suele indicar controles con tu especialista o con equipos
            de apoyo (kinesiología, nutrición, etc.). Puedes gestionarlos en línea o por los
            canales de agenda indicados por el centro.
          </p>
          <Link className="cta" to="/procesosclinicos/cita-post" aria-label="Agendar cita post hospitalización">
            Agendar cita
          </Link>
        </div>
      </div>

      <Link className="bot botones_azules volver" to="/procesosclinicos">Volver</Link>
    </div>
  );
}
