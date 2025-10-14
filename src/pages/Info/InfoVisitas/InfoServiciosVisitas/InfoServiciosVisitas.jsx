import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
} from "../../../../components/ui.js";

export default function InfoServiciosVisitas() {
    return (
        <main className={pageContainer}>
            <img src={logo} alt="Logo UC Christus" className={logoClass} />
            <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
            <section className={sectionStack}>
                <div className={`${actionBlue} pointer-events-none`}>SERVICIOS PARA VISITAS</div>
                <Link className={actionWhite} to="/info_comida">
                    CAFETERÍAS, MARKETPLACES, MÁQUINAS EXPENDEDORAS, ETC
                </Link>
                <Link className={actionWhite} to="/info_reflexion">
                    CAPILLAS O ESPACIOS DE REFLEXIÓN
                </Link>
                <Link className={actionWhite} to="/info_instalaciones">
                    ESTACIONAMIENTO, CAJERO AUTOMÁTICO, WIFI
                </Link>
                <Link className={actionBlue} to="/info_visitas">
                    Volver
                </Link>
            </section>
        </main>
    );
}
