import React from "react";
import { Link } from "react-router-dom";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";

export default function HorariosVisitasBanco() {
  return (
    <div className="app vista">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <div className="bot botones_azules titulo-estatica">HORARIOS VISITAS / BANCO DE SANGRE</div>

      <div className="contenido centrar">
        <h2 className="titulo">¿Sabías que…?</h2>

        <div className="bloque centrado">
          <p>
            Los horarios de visita pueden variar según la unidad (médico-quirúrgico, maternidad,
            pediatría, UCI/Intermedio, etc.). Verifica siempre con la unidad de hospitalización.
          </p>
          <ul className="lista-centrada">
            <li>Respeta los aforos definidos por cada unidad.</li>
            <li>En unidades críticas, el tiempo de visita es más acotado.</li>
            <li>Si el paciente es menor de edad, debe asistir con su adulto responsable.</li>
          </ul>

          <h3>Banco de sangre</h3>
          <p>
            El horario de donación y retiro de hemocomponentes se publica por el hospital y puede
            actualizarse en contingencias. Revisa los horarios oficiales antes de acudir.
          </p>
        </div>
      </div>

      <Link className="bot botones_azules volver" to="/procesosclinicos">Volver</Link>
    </div>
  );
}
