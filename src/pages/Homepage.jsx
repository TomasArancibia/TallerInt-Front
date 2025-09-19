import React from "react";
import "./homepage.css";
import logo from "../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>

      <section className="botones">
        <h2 className="titulo_seccion">Informaciones</h2>
        <Link className="bot botones_azules" to="/procesosclinicos">
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </Link>
        <Link className="bot botones_azules" to="/info_administrativa">
          INFORMACIÓN ADMINISTRATIVA, PAGOS Y BENEFICIOS SOCIALES
        </Link>
        <Link className="bot botones_azules" to="/info_visitas">
          ACOMPAÑANTES, VISITAS Y SERVICIOS DISPONIBLES
        </Link>
        <h2 className="titulo_seccion">Solicitudes</h2>
        <Link className="bot botones_morados" to="/mantencion">
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </Link>
        <Link className="bot botones_morados" to="/nutricion_y_alimentacion">
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </Link>
        <Link className="bot botones_morados" to="/limpieza">
          LIMPIEZA DE HABITACIÓN, BAÑO O BOX
        </Link>
        <Link className="bot botones_morados" to="/asistencia_social">
          ASISTENCIA SOCIAL
        </Link>
        <Link className="bot botones_morados" to="/acompanamiento_espiritual">
          ACOMPAÑAMIENTO ESPIRITUAL
        </Link>
        <form className="pregunta" action="respuesta.html" method="get">
          <input
            id="q"
            name="q"
            type="search"
            placeholder="Escribe una pregunta que quieras resolver"
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}