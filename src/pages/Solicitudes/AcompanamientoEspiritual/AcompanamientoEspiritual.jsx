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

export default function AcompanamientoEspiritual() {
  const opciones = [
    "Solicita visita de acompañante espiritual",
    "Solicita oraciones por su salud",
    "Solicita sacramento Unción, Comunión y Confesión",
    "Otros",
  ];

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          ACOMPAÑAMIENTO SOCIAL Y/O ESPIRITUAL
        </div>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          (Independiente de su credo o visión de la vida)
        </p>

        {opciones.map((nombre) => (
          <Link
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            state={{
              areaName: "Acompañamiento espiritual",
              tipo: nombre,
              backHref: "/acompanamiento_espiritual",
              backLabel: "Menú acompañamiento",
              titulo: "SERVICIO DE ACOMPAÑAMIENTO ESPIRITUAL",
            }}
          >
            {nombre}
          </Link>
        ))}
      </section>
    </main>
  );
}
