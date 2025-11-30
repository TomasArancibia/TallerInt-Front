import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionBlue,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";
import PortalTrackedLink from "../../../components/PortalTrackedLink.jsx";

export default function SegurosConvenios() {
  const opciones = Array.from({ length: 7 }).map((_, index) => ({
    label: "PONER TEXTO",
    to: "/procesosclinicos",
    code: `seguros-convenios-${index + 1}`,
  }));

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          SEGUROS UC CHRISTUS Y CONVENIOS COMERCIALES
        </div>
        {opciones.map((opcion) => (
          <PortalTrackedLink
            key={opcion.code}
            className={actionWhite}
            to={opcion.to}
            trackingCategory="info_administrativa"
            trackingCode={opcion.code}
          >
            {opcion.label}
          </PortalTrackedLink>
        ))}
      </section>
    </main>
  );
}
