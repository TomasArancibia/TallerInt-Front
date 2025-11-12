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

export default function Limpieza() {
  const opciones = [
    "Despapelado (retiro basura)",
    "Limpieza diaria (falta aseo)",
    "Derrame de líquidos",
    "Reposición de insumos (papel higiénico, jabón, etc)",
    "Horario de aseo",
    "Otro",
  ];

  const hasContext = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;

  if (!hasContext) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Esta sección requiere un QR válido. Escanee el código en su cama para solicitar servicios de limpieza.
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
          SOLICITUD DE LIMPIEZA
        </div>

        {opciones.map((nombre, index) => (
          <PortalTrackedLink
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            trackingCategory="solicitud_limpieza"
            trackingCode={`limpieza-${index + 1}`}
            state={{
              areaName: "Limpieza",
              apiAreaName: "Limpieza de habitación, baño o box",
              tipo: nombre,
              backHref: "/limpieza",
              backLabel: "Menú limpieza",
              titulo: "SOLICITUD DE LIMPIEZA",
            }}
          >
            {nombre}
          </PortalTrackedLink>
        ))}
      </section>
    </main>
  );
}
