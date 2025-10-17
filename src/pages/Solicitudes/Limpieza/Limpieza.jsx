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

export default function Limpieza() {
  const opciones = [
    "Despapelado (retiro basura)",
    "Limpieza diaria (falta aseo)",
    "Derrame de líquidos",
  ];

  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>
          SOLICITUD DE LIMPIEZA
        </div>

        {opciones.map((nombre) => (
          <Link
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            state={{
              areaName: "Limpieza",
              tipo: nombre,
              backHref: "/limpieza",
              backLabel: "Menú limpieza",
              titulo: "SOLICITUD DE LIMPIEZA",
            }}
          >
            {nombre}
          </Link>
        ))}
      </section>
    </main>
  );
}
