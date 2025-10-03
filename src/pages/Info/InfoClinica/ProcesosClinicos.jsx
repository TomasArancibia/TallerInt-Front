import React from "react";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function ProcesosClinicos() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE </div>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            RESULTADOS DE EXÁMENES (LABORATORIO E IMÁGENES)
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            DOCUMENTACIÓN CLINICA (FICHA CLÍNICA, EPICRISIS, PROTOCOLOS OPERATORIOS, ETC)
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            INFORMACIÓN SOBRE DIÁGNOSTICO O DE TRATAMIENTO MÉDICO
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿DONDE AGENDO UNA CITA POST HOSPITALIZACIÓN?
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            HORARIO VISITAS Y BANCO SANGRE
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PROCESOS DE ALTA
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}