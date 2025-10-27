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

export default function ResultadosExamenes() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>RESULTADOS DE EXÁMENES</div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">
          ¿Dónde puedo ver mis exámenes?
        </h2>

        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">Laboratorio</h3>
          <p>
            Los resultados se publican en línea cuando han sido validados por el laboratorio.
            Puedes revisarlos con tus datos personales.
          </p>
          <div className="flex justify-start">
            <Link
              className={inlineCta}
              to="/procesosclinicos/resultados"
              aria-label="Revisar resultados de Laboratorio"
            >
              Revisar laboratorio
            </Link>
          </div>
        </div>

        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">Imágenes</h3>
          <p>
            Incluye radiografías, TAC, RM y otros. Podrás ver el informe e imágenes una vez
            liberados. Algunos portales solicitan RUT y el folio u orden de atención del examen.
          </p>
          <div className="flex justify-start">
            <Link
              className={inlineCta}
              to="/procesosclinicos/resultados"
              aria-label="Revisar resultados de Imágenes"
            >
              Revisar imágenes
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
