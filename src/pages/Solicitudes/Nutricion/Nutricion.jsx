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

export default function NutricionAlimentacion() {
  const opciones = [
    "Demora entrega de alimento",
    "Alimentos no son según mi condición de salud",
    "Problemas con la calidad de los alimentos",
    "Necesito visita de nutricionista",
    "Otros",
  ];

  const hasContext = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;

  if (!hasContext) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Esta sección requiere un QR válido. Escanee el código en su cama para solicitar asistencia.
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
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </div>

        {opciones.map((nombre, index) => (
          <PortalTrackedLink
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            trackingCategory="solicitud_nutricion"
            trackingCode={`nutricion-${index + 1}`}
            state={{
              areaName: "Nutrición",
              apiAreaName: "Nutrición y alimentación a pacientes",
              tipo: nombre,
              backHref: "/nutricion_y_alimentacion",
              backLabel: "Menú nutrición",
              titulo: "NUTRICIÓN Y ALIMENTACIÓN A PACIENTES",
            }}
          >
            {nombre}
          </PortalTrackedLink>
        ))}
      </section>
    </main>
  );
}
