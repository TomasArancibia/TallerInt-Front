import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-ucchristus.png";
import {
  pageContainer,
  logoClass,
  actionBlue,
  contentCard,
} from "../../../components/ui.js";

export default function InfoDiagnosticoTratamiento() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <div className={`${actionBlue} pointer-events-none`}>
        INFORMACIÓN SOBRE DIAGNÓSTICO O TRATAMIENTO
      </div>

      <div className="mx-auto mt-4 w-full max-w-3xl space-y-4 text-center text-sm leading-relaxed text-slate-700">
        <h2 className="text-base font-semibold text-purple-700">¿Sabías que…?</h2>

        <div className={`${contentCard} space-y-4 text-center`}>
          <p>
            La información clínica la entrega el médico tratante o su equipo al paciente y, si
            corresponde, a la persona acompañante responsable designada.
          </p>
          <ul className="mx-auto list-inside list-disc space-y-2 text-left text-sm leading-relaxed text-slate-700 sm:max-w-xl">
            <li>Derecho a recibir información clara y comprensible (Ley 20.584).</li>
            <li>Conocer alternativas terapéuticas, beneficios y riesgos.</li>
            <li>Registrar dudas y resolverlas con el equipo tratante.</li>
          </ul>
          <p>Si necesitas aclaraciones, solicita una conversación o agenda un control.</p>
        </div>
      </div>

      <Link className={`${actionBlue} mt-6 w-full max-w-2xl`} to="/procesosclinicos">
        Volver
      </Link>
    </main>
  );
}
