import React from "react";
import "../../../homepage.css";
import "../info.css"
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoComida() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <section className="botones">
                <div className="bot botones_azules titulo-estatica"> CAFETERÍAS, MARKETPLACES, ETC </div>
                <div className="info-text">
                    <p>
                        El Hospital cuenta con sectores para comodidad y consumo personal de acompañantes y visitas:
                    </p>
                    <h3>Cafeterías</h3>
                    <ul>
                        <li>1er piso del Sector Acceso Principal y Sector G (con terraza)</li>
                        <li>2do Piso Sala de Espera.</li>
                    </ul>
                    <h3>
                        Marketplaces
                    </h3>
                    <ul>
                        <li>1er piso del Sector Acceso Principal y Sector G</li>
                    </ul>
                    <h3>Maquinas expendedoras de alimentos</h3>
                    <ul>
                        <li>
                            En diferentes pisos del Hospital, Imágenes, Urgencia y Banco de Sangre.
                        </li>
                    </ul>
                    <h3>

                        App para Room Service
                    </h3>
                    <ul>
                        <li>
                            Acompañante o visita puede instalar la app “SIMPLY PAY by SODEXO” en Apple o Android Store (Pago mediante tarjetas). Acompañante o visita deberá indicar habitación para la entrega.
                        </li>
                    </ul>
                   <p>
                    El Hospital permite que los acompañantes traigan alimentos solo para <strong className="strong-purple">consumo personal</strong> (no compartir con pacientes), siempre que estén en envases sellados (como tuppers o termos).  La manipulación, refrigeración y pérdida de estos alimentos es responsabilidad del acompañante. No se permite su almacenamiento en espacios del hospital ni el uso de recursos ya sea del personal, implementos u otros)
                   </p>
                </div>
                <Link className="bot botones_azules" to="/info_servicios_visitas">
                    Volver
                </Link>
            </section>
        </div>
    );
}