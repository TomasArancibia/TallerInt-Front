import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>

      <section className="botones">
        <Link className="bot botones_azules" to="/procesosclinicos">
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </Link>
        <Link className="bot botones_azules" to="/seguridad_asistencial">
          INFORMACIÓN SOBRE SEGURIDAD ASISTENCIAL Y CUIDADOS CLÍNICOS
        </Link>
        <Link className="bot botones_azules" to="/info_administrativa">
          INFORMACIÓN ADMINISTRATIVA Y COSTOS DE PRESTACIONES
        </Link>
        <Link className="bot botones_azules" to="/info_visitas">
          INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
        </Link>

        <a className="bot botones_morados" href="nutricion_y_alimentacion.html">
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </a>
        <a className="bot botones_morados" href="limpieza.html">
          LIMPIEZA DE HABITACIÓN, BAÑO O BOX
        </a>
        <a className="bot botones_morados" href="mantencion_comodidad.html">
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </a>

        <a className="bot botones_celestes" href="beneficios_sociales.html">
          BENEFICIOS SOCIALES
        </a>
        <a className="bot botones_celestes" href="serv_acompañamiento.html">
          SERVICIO DE ACOMPAÑAMIENTO ESPIRITUAL (Independiente de su credo o
          visión de vida)
        </a>
        <a className="bot botones_celestes" href="seguros.html">
          SEGUROS UC CHRISTUS Y CONVENIOS COMERCIALES
        </a>

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