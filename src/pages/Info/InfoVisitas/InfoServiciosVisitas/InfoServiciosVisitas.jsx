import React from "react";
import "../../../homepage.css";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";

export default function InfoServiciosVisitas() {
    return (
        <div className="app">
            <img src={logo} alt="Logo UC Christus" className="logo" />
            <p>Por favor indíquenos de qué área es su consulta</p>
            <section className="botones">
                <div className="bot botones_azules titulo-estatica">SERVICIOS PARA VISITAS </div>
                <Link className="bot botones_blancos" to="/info_comida">
                    CAFETERÍAS, MARKETPLACES, MÁQUINA EXPENDEDORAS, ETC
                </Link>
                <Link className="bot botones_blancos" to="/info_reflexion">
                    CAPILLAS O ESPACIOS DE REFLEXIÓN</Link>
                <Link className="bot botones_blancos" to="/info_instalaciones">
                    ESTACIONAMIENTO, CAJERO AUTOMÁTICO, WIFI
                </Link>
                <Link className="bot botones_azules" to="/info_visitas">
                    Volver
                </Link>
            </section>
        </div>
    );
}