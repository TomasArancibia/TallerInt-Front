import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoDifVisAco() {
  return (
    <div className="app">
      <img src={logo} alt="Logo UC Christus" className="logo" />
      <section className="botones">
        <div className="bot botones_azules titulo-estatica"> DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA </div>
        <div className="info-text">
        <h3>Acompañante Responsable</h3>
        <p>
            Es una persona mayor de 18 años, designada por el paciente, que está autorizada para recibir información clínica y tomar decisiones médicas en caso de que el paciente no pueda hacerlo. También debe gestionar las visitas del paciente y, si el médico lo indica, acompañarlo 24/7 durante su estadía. En menores o personas con discapacidad, debe ser su representante legal. Además, es quien retira al paciente al momento del alta.
        </p>
        <h3>Visita</h3>
        <p>
            Es una persona autorizada por el paciente (o por el acompañante responsable si el paciente no puede decidir), que puede ingresar a visitarlo durante los horarios establecidos por el hospital. No puede recibir información clínica salvo autorización explícita del paciente o su acompañante responsable. Incluye también visitas significativas solicitadas por niños, niñas o adolescentes. No puede ser visita quien tenga una orden judicial de alejamiento.
        </p>
        </div>
          <Link className="bot botones_azules" to="/info_general_visitas">
            Volver
          </Link>
        </section>
    </div>
  );
}