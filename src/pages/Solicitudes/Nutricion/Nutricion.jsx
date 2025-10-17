import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  actionWhite,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function NutricionAlimentacion() {
  const opciones = [
    "Demora entrega de alimento",
    "Alimentos no son según mi condición de salud",
    "Problemas con la calidad de los alimentos",
    "Necesito visita de nutricionista",
    "Otros",
  ];

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          NUTRICIÓN Y ALIMENTACIÓN A PACIENTES
        </div>

        {opciones.map((nombre) => (
          <Link
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            state={{
              areaName: "Nutrición",
              tipo: nombre,
              backHref: "/nutricion_y_alimentacion",
              backLabel: "Menú nutrición",
              titulo: "NUTRICIÓN Y ALIMENTACIÓN A PACIENTES",
            }}
          >
            {nombre}
          </Link>
        ))}
      </section>
    </main>
  );
}
