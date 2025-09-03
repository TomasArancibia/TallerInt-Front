import React from "react";
import "./homepage.css";
import logo from "./assets/logo-ucchristus.png";

export default function Homepage() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <p>Por favor indíquenos de qué área es su consulta</p>

      <section className="botones">
        <a className="bot botones_azules" href="procesosclinicos.html">
          INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE
        </a>
        <a className="bot botones_azules" href="seguridad_y_asistencia.html">
          INFORMACIÓN SOBRE SEGURIDAD ASISTENCIAL Y CUIDADOS CLÍNICOS
        </a>
        <a className="bot botones_azules" href="info_administrativa.html">
          INFORMACIÓN ADMINISTRATIVA Y COSTOS DE PRESTACIONES
        </a>
        <a className="bot botones_azules" href="acompañantes_y_visitas.html">
          INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS
        </a>

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