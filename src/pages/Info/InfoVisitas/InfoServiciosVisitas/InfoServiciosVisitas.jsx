import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";
import PortalTrackedLink from "../../../../components/PortalTrackedLink.jsx";

export default function InfoServiciosVisitas() {
    return (
        <main className={pageContainer}>
            <PageNav backHref="/info_visitas" className="mb-4" backLabel="Menú visitas" />
            <Logo />
            <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
            <section className={sectionStack}>
                <div className={`${actionBlue} pointer-events-none`}>SERVICIOS PARA VISITAS</div>
                <PortalTrackedLink
                    className={actionWhite}
                    to="/info_comida"
                    trackingCategory="info_visitas_servicios"
                    trackingCode="info-visitas-servicios-comida"
                >
                    CAFETERÍAS, MARKETPLACES, MÁQUINAS EXPENDEDORAS, ETC
                </PortalTrackedLink>
                <PortalTrackedLink
                    className={actionWhite}
                    to="/info_reflexion"
                    trackingCategory="info_visitas_servicios"
                    trackingCode="info-visitas-servicios-reflexion"
                >
                    CAPILLAS O ESPACIOS DE REFLEXIÓN
                </PortalTrackedLink>
                <PortalTrackedLink
                    className={actionWhite}
                    to="/info_instalaciones"
                    trackingCategory="info_visitas_servicios"
                    trackingCode="info-visitas-servicios-instalaciones"
                >
                    ESTACIONAMIENTO, CAJERO AUTOMÁTICO, WIFI
                </PortalTrackedLink>
            </section>
        </main>
    );
}
