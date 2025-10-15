import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function HorariosVisitasBanco() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className={`${actionBlue} pointer-events-none`}>
        HORARIOS VISITAS / BANCO DE SANGRE
      </div>

      <div className="mx-auto mt-4 w-full max-w-3xl space-y-4 text-center text-sm leading-relaxed text-slate-700">
        <h2 className="text-base font-semibold text-purple-700">¿Sabías que…?</h2>

        <div className={`${contentCard} space-y-4 text-center`}>
          <p>
            Los horarios de visita pueden variar según la unidad (médico-quirúrgico, maternidad,
            pediatría, UCI/Intermedio, etc.). Verifica siempre con la unidad de hospitalización.
          </p>
          <ul className="mx-auto list-inside list-disc space-y-2 text-left text-sm leading-relaxed text-slate-700 sm:max-w-xl">
            <li>Respeta los aforos definidos por cada unidad.</li>
            <li>En unidades críticas, el tiempo de visita es más acotado.</li>
            <li>Si el paciente es menor de edad, debe asistir con su adulto responsable.</li>
          </ul>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Banco de sangre</h3>
            <p>
              El horario de donación y retiro de hemocomponentes se publica por el hospital y puede
              actualizarse en contingencias. Revisa los horarios oficiales antes de acudir.
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
