import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoRolResp() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <section className="botones">
        <div className="bot botones_azules titulo-estatica"> ROL DEL ACOMPAÑANTE </div>
        <div className="info-text">
        <p>
            El acompañante responsable tiene un rol clave en su atención médica. Sus funciones incluyen:
        </p>
        <ul>
            <li>Recibir información clínica del equipo tratante.</li>
            <li>Tomar decisiones médicas en caso de que el paciente no pueda hacerlo.</li>
            <li>Gestionar las visitas del paciente.</li>
            <li>Acompañar al paciente 24/7 durante su estadía, si el médico lo indica, o coordinar a alguien que lo haga.</li>
            <li>Apoyar en el alta, retirando al paciente con sus pertenencias.</li>
        </ul>
        <h3>Casos Especiales:</h3>
        <ul>
            <li>
                Menores de edad: hasta 2 acompañantes, deben ser padres o representantes legales. Pueden  deben estar disponibles las 24 horas mientras dure la atención
            </li>
            <li>
                Adultos con condiciones de neurodesarrollo: debe ser su representante legal. Pueden o deben estar disponibles las 24 horas mientras dure la atención
            </li>
            <li>
                Adultos con discapacidad cognitiva o demencia: se prioriza a un familiar cercano. Deben estar disponibles las 24 horas mientras dure la atención
            </li>
            <li>
                Pacientes inconscientes o sin capacidad: se prioriza a cónyuge, padres, hijos mayores, etc.
            </li>
        </ul>
        <p>
            Este acompañante es el único con autorización para acceder a la información médica y coordinar apoyos durante la estadía del paciente.
        </p>
        </div>
          <Link className="bot botones_azules" to="/info_general_visitas">
            Volver
          </Link>
        </section>
    </div>
  );
}