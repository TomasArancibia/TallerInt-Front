import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoLeyMila() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_general_visitas"
        className="mb-4"
        backLabel="Menú general visitas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>LEY MILA N°21.372</div>
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">¿Sabías que...?</h3>
          <p>
            La Ley Mila es una ley chilena que garantiza el derecho de niños, niñas y adolescentes
            (NNA) y mujeres gestantes a ser acompañados por una figura significativa durante su
            atención médica, hospitalización o parto. Su objetivo es brindar apoyo emocional y
            seguridad a los pacientes en situaciones críticas y promover un trato más humano y digno
            en el sistema de salud.
          </p>

          <ul className="list-disc space-y-2 pl-5 text-sm sm:text-base">
            <li>
              <span className="font-semibold text-purple-700">Elección del acompañante:</span> Los
              pacientes tienen derecho a decidir quién los acompaña y a solicitar un cambio de
              acompañante si lo estiman necesario.
            </li>
            <li>
              <span className="font-semibold text-purple-700">Acompañamiento durante el parto:</span>
              Las mujeres gestantes pueden estar acompañadas durante el preparto, parto y puerperio,
              salvo que existan riesgos clínicos.
            </li>
            <li>
              <span className="font-semibold text-purple-700">Condiciones adecuadas:</span> Los
              establecimientos de salud deben garantizar un trato respetuoso tanto hacia los
              pacientes como hacia sus acompañantes, disponiendo de condiciones que permitan su
              presencia de forma segura y digna.
            </li>
            <li>
              <span className="font-semibold text-purple-700">Limitaciones justificadas:</span> Solo
              por razones médicas fundadas, de seguridad o de respeto a la privacidad de otros
              pacientes se podrá restringir temporalmente este derecho.
            </li>
            <li>
              <span className="font-semibold text-purple-700">Formación del personal:</span> La ley
              también impulsa la capacitación de los equipos de salud en prácticas de
              acompañamiento y trato humanizado.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
