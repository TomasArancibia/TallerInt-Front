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
  return (
    <main className={pageContainer}>
      <PageNav backHref="/" className="mb-4" />
      <Logo />
      <p className={helperText}>Por favor indíquenos de qué área es su consulta</p>
      <section className={sectionStack}>
        <div className={`${actionPurple} pointer-events-none`}>SOLICITUDES DE MANTENCIÓN</div>

        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "BAÑO" }}>
          BAÑO
        </Link>
        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "CAMA (LUCES, TIMBRE, ETC)" }}>
          CAMA (LUCES, TIMBRE, ETC)
        </Link>
        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "CLIMATIZACIÓN" }}>
          CLIMATIZACIÓN
        </Link>
        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "TELEVISOR Y CONTROL REMOTO" }}>
          TELEVISOR Y CONTROL REMOTO
        </Link>
        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "MOBILIARIO DENTRO DE LA HABITACIÓN" }}>
          MOBILIARIO DENTRO DE LA HABITACIÓN
        </Link>
        <Link className={actionWhite} to="/solicitudmantencion" state={{ areaName: "Mantención", tipo: "OTRO TIPO DE MANTENCIÓN" }}>
          OTRO TIPO DE MANTENCIÓN
        </Link>
      </section>
    </main>
  );
}
