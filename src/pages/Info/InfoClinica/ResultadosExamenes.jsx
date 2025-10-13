import React from "react";
import { Link } from "react-router-dom";
import "../../homepage.css";
import logo from "../../../assets/logo-ucchristus.png";

export default function ResultadosExamenes() {
  return (
    <div className="app vista">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <div className="bot botones_azules titulo-estatica">RESULTADOS DE EXÁMENES</div>

      <div className="contenido centrar">
        <h2 className="titulo">¿Dónde puedo ver mis exámenes?</h2>

        <div className="bloque centrado">
          <h3>Laboratorio</h3>
          <p>
            Los resultados se publican en línea cuando han sido validados por el laboratorio.
            Puedes revisarlos con tus datos personales.
          </p>
          <Link className="cta" to="/procesosclinicos/resultados" aria-label="Revisar resultados de Laboratorio">
            Revisar Laboratorio
          </Link>
        </div>

        <div className="bloque centrado">
          <h3>Imágenes</h3>
          <p>
            Incluye radiografías, TAC, RM y otros. Podrás ver el informe e imágenes una vez
            liberados. Algunos portales solicitan RUT y el folio/orden de atención del examen.
          </p>
          <Link className="cta" to="/procesosclinicos/resultados" aria-label="Revisar resultados de Imágenes">
            Revisar Imágenes
          </Link>

        </div>
      </div>

      <Link className="bot botones_azules volver" to="/procesosclinicos">Volver</Link>
    </div>
  );
}
