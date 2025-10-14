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

export default function ResultadosExamenes() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <div className={`${actionBlue} pointer-events-none`}>RESULTADOS DE EXÁMENES</div>

      <div className="mx-auto mt-4 w-full max-w-3xl space-y-4 text-center text-sm leading-relaxed text-slate-700">
        <h2 className="text-base font-semibold text-purple-700">¿Dónde puedo ver mis exámenes?</h2>

        <div className={`${contentCard} space-y-3 text-center`}>
          <h3 className="text-base font-semibold text-purple-700">Laboratorio</h3>
          <p>
            Los resultados se publican en línea cuando han sido validados por el laboratorio.
            Puedes revisarlos con tus datos personales.
          </p>
          <Link className={inlineCta} to="/procesosclinicos/resultados" aria-label="Revisar resultados de Laboratorio">
            Revisar Laboratorio
          </Link>
        </div>

        <div className={`${contentCard} space-y-3 text-center`}>
          <h3 className="text-base font-semibold text-purple-700">Imágenes</h3>
          <p>
            Incluye radiografías, TAC, RM y otros. Podrás ver el informe e imágenes una vez
            liberados. Algunos portales solicitan RUT y el folio/orden de atención del examen.
          </p>
          <Link className={inlineCta} to="/procesosclinicos/resultados" aria-label="Revisar resultados de Imágenes">
            Revisar Imágenes
          </Link>
        </div>
      </div>

      <Link className={`${actionBlue} mt-6 w-full max-w-2xl`} to="/procesosclinicos">
        Volver
      </Link>
    </main>
  );
}
