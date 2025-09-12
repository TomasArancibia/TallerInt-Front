import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function ProcesosClinicos() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>
      <section className="botones">
          <div className="bot botones_azules titulo-estatica"> INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE </div>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿QUIÉN ME ENTREGARÁ DIÁGNOSTICO DE TRATAMIENTO MÉDICO?
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿HORARIOS DE INFORMACIÓN POR PARTE DE MÉDICO TRATANTE
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿QUÉ ES DOCUMENTACIÓN CLÍNICA? (FICHA CLÍNICA, EPICRISIS, PROTOCOLOS OPERATORIOS, RECETAS MÉDICAS)
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿DONDE CONSIGO RESULTADO DE EXÁMENES?
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿DONDE AGENDO UNA CITA POR HOSPITALIZACIÓN?
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            ¿QUÉ CUIDADOS DEBO TENER DURANTE MI ALTA?
          </Link>
          <Link className="bot botones_blancos" to="/procesosclinicos">
            PREGUNTAS FRECUENTES AL ALTA
          </Link>
          <Link className="bot botones_azules" to="/">
            Volver
          </Link>
        </section>
    </div>
  );
}