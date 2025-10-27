import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoServiciosVisitas() {
    return (
        <main className={pageContainer}>
            <PageNav backHref="/info_visitas" className="mb-4" backLabel="Menú visitas" />
            <Logo />
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
            </section>
        </main>
    );
}
