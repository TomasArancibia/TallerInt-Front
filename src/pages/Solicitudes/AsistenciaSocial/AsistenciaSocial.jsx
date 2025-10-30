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

export default function AsistenciaSocial() {
  const opciones = [
    "Necesito contacto con asistente social",
    "Orientación sobre beneficios o redes de apoyo",
    "Ayuda con documentos médicos o licencias",
    "Otros",
  ];

  const hasContext = typeof window !== "undefined" ? sessionStorage.getItem("id_cama") : null;

  if (!hasContext) {
    return (
      <main className={pageContainer}>
        <Logo />
        <p className={helperText}>
          Esta sección requiere un QR válido. Escanee el código en su cama para solicitar asistencia social.
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
        <div className={`${actionPurple} pointer-events-none`}>ASISTENCIA SOCIAL</div>

        {opciones.map((nombre) => (
          <Link
            key={nombre}
            className={`${actionWhite} border-purple-700 text-black`}
            to="/solicitudes/nueva"
            state={{
              areaName: "Asistencia social",
              apiAreaName: "Asistencia social",
              tipo: nombre,
              backHref: "/asistencia_social",
              backLabel: "Menú asistencia social",
              titulo: "ASISTENCIA SOCIAL",
            }}
          >
            {nombre}
          </Link>
        ))}
      </section>
    </main>
  );
}
