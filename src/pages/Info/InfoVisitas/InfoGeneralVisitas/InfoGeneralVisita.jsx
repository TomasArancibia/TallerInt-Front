import React from "react";
import "../../../homepage.css";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoGeneralVisita() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS </div>
          <Link className="bot botones_blancos" to="/info_dif_vis_aco">
            DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA
          </Link>
          <Link className="bot botones_blancos" to="/info_rol_resp">
            ROL Y RESPONSABILIDADES DEL ACOMPAÑANTE RESPONSABLE
          </Link>
          <Link className="bot botones_blancos" to="/info_rol_pagare">
            DIFERENCIA ENTRE RESPONSABLE DE PAGARÉ Y ACOMPAÑANTE
          </Link>
          <Link className="bot botones_azules" to="/info_visitas">
            Volver
          </Link>
        </section>
    </div>
  );
}