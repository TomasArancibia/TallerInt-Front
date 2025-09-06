import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoVisitas() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS</p>
      <Link className="bot botones_azules" to="/info_visitas">
        INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
      </Link>
        <br />
        <Link className="bot botones_azules" to="/">
          volver
        </Link>
    </div>
  );
}