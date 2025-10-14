import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-ucchristus.png";
import {
  pageContainer,
  logoClass,
  actionBlue,
  contentCard,
  inlineCta,
} from "../../../components/ui.js";

export default function CitaPostHospitalizacion() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <div className={`${actionBlue} pointer-events-none`}>CITA POST HOSPITALIZACIÓN</div>

      <div className="mx-auto mt-4 w-full max-w-3xl space-y-4 text-center text-sm leading-relaxed text-slate-700">
        <h2 className="text-base font-semibold text-purple-700">
          ¿Dónde agendo una cita post hospitalización?
        </h2>

        <div className={`${contentCard} space-y-3 text-center`}>
          <p>
            Tras el alta, el hospital suele indicar controles con tu especialista o con equipos
            de apoyo (kinesiología, nutrición, etc.). Puedes gestionarlos en línea o por los
            canales de agenda indicados por el centro.
          </p>
          <Link className={inlineCta} to="/procesosclinicos/cita-post" aria-label="Agendar cita post hospitalización">
            Agendar cita
          </Link>
        </div>
      </div>

      <Link className={`${actionBlue} mt-6 w-full max-w-2xl`} to="/procesosclinicos">
        Volver
      </Link>
    </main>
  );
}
