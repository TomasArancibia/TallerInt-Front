import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  actionBlue,
  contentCard,
  inlineCta,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function ResultadosExamenes() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
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

    </main>
  );
}
