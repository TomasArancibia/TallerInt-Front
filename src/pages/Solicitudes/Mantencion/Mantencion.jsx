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

export default function Mantencion() {
  const opciones = [
    "BAÑO",
    "CAMA (LUCES, TIMBRE, ETC)",
    "CLIMATIZACIÓN",
    "TELEVISOR Y CONTROL REMOTO",
    "MOBILIARIO DENTRO DE LA HABITACIÓN",
    "OTRO TIPO DE MANTENCIÓN",
  ];

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          SOLICITUDES DE MANTENCIÓN - COMODIDAD
        </div>

        {opciones.map((nombre) => (
          <Link
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            state={{
              areaName: "Mantención y Comodidad",
              tipo: nombre,
              backHref: "/mantencion",
              backLabel: "Menú mantención",
              titulo: "SOLICITUDES DE MANTENCIÓN - COMODIDAD",
            }}
          >
            {nombre}
          </Link>
        ))}
      </section>
    </main>
  );
}
