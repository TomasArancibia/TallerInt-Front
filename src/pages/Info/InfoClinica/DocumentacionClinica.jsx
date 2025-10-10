import React from "react";
import { Link } from "react-router-dom";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";

export default function DocumentacionClinica() {
  return (
    <div className="app vista">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <div className="bot botones_azules titulo-estatica">DOCUMENTACIÓN CLÍNICA</div>

      <div className="contenido centrar">
        <h2 className="titulo">¿Qué es cada documento?</h2>

        <div className="bloque centrado">
          <h3>Ficha Clínica</h3>
          <p>
            Documento legal que contiene antecedentes de salud, atenciones y procedimientos
            realizados. Es personal y se resguarda con confidencialidad.
          </p>

          <h3>Epicrisis</h3>
          <p>
            Resumen del proceso de hospitalización: diagnóstico, evolución, indicaciones y
            controles. Se entrega al alta o cuando lo indique el equipo tratante.
          </p>

          <h3>Protocolo operatorio</h3>
          <p>
            Informe del acto quirúrgico con técnica empleada, hallazgos y eventuales indicaciones.
          </p>
        </div>

        <h2 className="titulo">¿Cómo solicitar una copia?</h2>
        <div className="bloque centrado">
          <p>
            La entrega de copias se realiza al paciente o a su representante legal con la
            autorización correspondiente. Consulta el canal formal del hospital para solicitudes
            de ficha o informes.
          </p>
        </div>
      </div>

      <Link className="bot botones_azules volver" to="/procesosclinicos">Volver</Link>
    </div>
  );
}
