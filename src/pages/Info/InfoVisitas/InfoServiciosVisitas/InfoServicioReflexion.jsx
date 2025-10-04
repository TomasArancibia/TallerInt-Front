import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoReflexion() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <section className="botones">
                <div className="bot botones_azules titulo-estatica"> SERVICIOS DISPONIBLES </div>
                <div className="info-text">
                    <p>
                        En UC CHRISTUS, existen espacios dedicados a la oración y la reflexión espiritual. En el caso del Hospital, se dispone de los siguientes espacios:
                    </p>

                    <h3>Capilla San Lucas</h3>
                    <p>
                        Se ubica en el 1er piso del Hospital y oficia los siguientes servicios:
                    </p>
                    <ul>
                        <li>
                            Misa diaria: 12:00 hrs.
                        </li>
                        <li>
                            Santo Rosario: 8:10 hrs.
                        </li>
                        <li>
                            Adoración al Santísimo: Jueves entre 12:30 y 13:00 hrs. </li>
                        <li>
                            Misa mensual para pacientes fallecidos: Segundos viernes de cada mes.
                        </li>
                    </ul>
                    <h3>Oratorio San Alberto Hurtado</h3>
                    <p>
                        Se ubica en 4to piso del Hospital y permite el ofrecimiento de oraciones por parte de acompañantes / familiares.
                    </p>
                </div>
                <Link className="bot botones_azules" to="/info_servicios_visitas">
                    Volver
                </Link>
            </section>
        </div>
    );
}