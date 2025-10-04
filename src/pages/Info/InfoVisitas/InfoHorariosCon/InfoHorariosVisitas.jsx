import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import horarioVisitas from "../../../../assets/HorarioAtencion.png"
import horarioBanco from "../../../../assets/HorarioBanco.png"
import { Link } from "react-router-dom";

export default function InfoHoriariosVisitas() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <section className="botones">
        <div className="bot botones_azules titulo-estatica"> HORARIOS DE VISITAS </div>
        <div className="info-text">
        <h3 className="center-title">¿Sabías que...?</h3>
        <p>
            Los horarios de visitas médicas  a pacientes hospitalizados en UC Christus, en las distintas unidades son las siguientes:   
        </p>
        <img src={horarioVisitas} alt="Horario de Visitas" className="info-image"/>
        <p>
            El horario de banco de sangre es de lunes a viernes con (última emisión de ticket 16:45 hrs). Sábados, domingo y festivos cerrado.
        </p>
        <img src={horarioBanco} alt="Horario de Banco de Sangre" className="info-image"/>
        </div>
          <Link className="bot botones_azules" to="/info_horarios_condiciones">
            Volver
          </Link>
        </section>
    </div>
  );
}