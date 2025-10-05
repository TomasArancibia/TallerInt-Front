import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function InfoResPagare() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <section className="botones">
                <div className="bot botones_azules titulo-estatica"> ROL RESPONSABLE DE PAGARÉ </div>
                <div className="info-text">
                    <h3 className="center-title">¿Sabías que...?</h3>
                    <p>
                        El responsable del pagaré es la persona que firma el pagaré de cuenta hospitalaria. Puede ser el mismo paciente, acompañante, representante legal, o tercera persona. Tiene responsabilidad financiera con la institución sobre la cuenta hospitalaria del paciente. La institución no está obligada a entregar información clínica al responsable del pagaré, sino es el mismo paciente o acompañante responsable declarado.
                    </p>
                    <h3 className="center-title">¿Dónde puedo recibir mayor orientación?</h3>
                    <div className="icon-text">
                        <FontAwesomeIcon icon={faLocationDot} style={{ color: "#7c00a5", }} />
                        <p>
                            Marcoleta 367,  1er piso, Hospital Clínico UC CHRISTUS, Santiago Centro
                        </p>
                    </div>
                    <div className="icon-text">
                        <FontAwesomeIcon icon={faCalendar} style={{ color: "#7c00a5", }} />
                        <p>
                            De Lunes a Jueves: 09:00 a 16:30. Viernes de 09:00 a 15:30 hrs. Sábados, domingos y festivos cerrado
                        </p>
                    </div>
                </div>
                <Link className="bot botones_azules" to="/info_general_visitas">
                    Volver
                </Link>
            </section>
        </div>
    );
}