import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  actionBlue,
  contentCard,
  inlineCta,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function CitaPostHospitalizacion() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>CITA POST HOSPITALIZACIÓN</div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">
          ¿Dónde agendo una cita post hospitalización?
        </h2>

        <div className={`${contentCard} space-y-4`}>
          <p>
            Tras el alta, el hospital suele indicar controles con tu especialista o con equipos
            de apoyo (kinesiología, nutrición, etc.). Puedes gestionarlos en línea o por los
            canales de agenda indicados por el centro.
          </p>
          <div className="flex justify-start">
            <Link
              className={inlineCta}
              to="/procesosclinicos/cita-post"
              aria-label="Agendar cita post hospitalización"
            >
              Agendar cita
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
