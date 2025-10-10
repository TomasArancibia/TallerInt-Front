import React from "react";
import { Link } from "react-router-dom";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";

export default function InfoDiagnosticoTratamiento() {
  return (
    <div className="app vista">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <div className="bot botones_azules titulo-estatica">
        INFORMACIÓN SOBRE DIAGNÓSTICO O TRATAMIENTO
      </div>

      <div className="contenido centrar">
        <h2 className="titulo">¿Sabías que…?</h2>

        <div className="bloque centrado">
          <p>
            La información clínica la entrega el médico tratante o su equipo al paciente y, si
            corresponde, a la persona acompañante responsable designada.
          </p>
          <ul className="lista-centrada">
            <li>Derecho a recibir información clara y comprensible (Ley 20.584).</li>
            <li>Conocer alternativas terapéuticas, beneficios y riesgos.</li>
            <li>Registrar dudas y resolverlas con el equipo tratante.</li>
          </ul>
          <p>Si necesitas aclaraciones, solicita una conversación o agenda un control.</p>
        </div>
      </div>

      <Link className="bot botones_azules volver" to="/procesosclinicos">Volver</Link>
    </div>
  );
}
