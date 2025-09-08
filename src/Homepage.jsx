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
        <Link className="bot botones_morados" to="/nutricion_y_alimentacion">
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </Link>
        <Link className="bot botones_morados" to="/limpieza">
          LIMPIEZA DE HABITACIÓN, BAÑO O BOX
        </Link>
        <Link className="bot botones_morados" to="/mantencion">
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </Link>
        <Link className="bot botones_celestes" to="/beneficios_sociales">
          BENEFICIOS SOCIALES
        </Link>
        <Link className="bot botones_celestes" to="/acompañamiento_espiritual">
          SERVICIO DE ACOMPAÑAMIENTO ESPIRITUAL (Independiente de su credo o
          visión de vida)
        </Link>

        <Link className="bot botones_celestes" to="/seguros_convenios">
          SEGUROS UC CHRISTUS Y CONVENIOS COMERCIALES
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