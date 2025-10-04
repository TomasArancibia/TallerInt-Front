import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoInstalaciones() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <section className="botones">
                <div className="bot botones_azules titulo-estatica"> SERVICIOS DISPONIBLES </div>
                <div className="info-text">
                    <h3>Cajero automático</h3>
                    <p>
                        Se encuentra en el 1er piso de la salida norte del  Hospital Clínico (sector G).
                    </p>

                    <h3>Wifi</h3>
                    <p>
                        En el Hospital Clínico como en la Clínica UC existe red WI-FI de libre disposición para nuestros pacientes y familias.
                    </p>
                    <h3>Estacionamientos</h3>
                    <p>
                        A nuestros pacientes hospitalizados, en que su régimen de ingreso sea de <strong className="strong-purple">habitación individual</strong> en el Hospital Clínico y Clínica UC, se les proveerá de un pase liberado para ser utilizado en el estacionamiento ubicado en Lira 85. Este pase tiene validez por toda la estadía del paciente y debe ser retirado en Admisión Hospital Clínico, 1° piso hall central.
                    </p>
                    <p>
                      En caso de otros tipos de regímenes de hospitalización, podrá solicitar ticket de descuento (Estacionamiento Lira 85) en el mesón de Informaciones, ubicado en el 1er piso del Hospital Clínico en horario hábil. Este ticket no es acumulable.
                    </p>  
                </div>
                <Link className="bot botones_azules" to="/info_servicios_visitas">
                    Volver
                </Link>
            </section>
        </div>
    );
}