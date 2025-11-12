import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";
import PortalTrackedLink from "../../../components/PortalTrackedLink.jsx";

export default function Mantencion() {
  const opciones = [
    "BAÑO",
    "CAMA (LUCES, TIMBRE, ETC)",
    "CLIMATIZACIÓN",
    "TELEVISOR Y CONTROL REMOTO",
    "MOBILIARIO DENTRO DE LA HABITACIÓN",
    "SUPERFICIES Y/O PARED",
    "TIMBRE DEFECTUOSO",
    "OTRO TIPO DE MANTENCIÓN",
  ];

  const hasContext = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;

  if (!hasContext) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Esta sección requiere un QR válido. Escanee el código en su cama para ingresar una solicitud.
        </p>
      </main>
    );
  }

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </div>

        {opciones.map((nombre, index) => (
          <PortalTrackedLink
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudmantencion"
            trackingCategory="solicitud_mantencion"
            trackingCode={`mantencion-${index + 1}`}
            state={{
              areaName: "Mantención y Comodidad",
              apiAreaName: "Mantención",
              tipo: nombre,
              backHref: "/mantencion",
              backLabel: "Menú mantención",
              titulo: "SOLICITUDES DE MANTENCIÓN - COMODIDAD",
            }}
          >
            {nombre}
          </PortalTrackedLink>
        ))}
      </section>
    </main>
  );
}
