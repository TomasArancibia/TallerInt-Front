import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoCuidadorExterno() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_general_visitas"
        className="mb-4"
        backLabel="Menú general visitas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>CUIDADOR DE EMPRESA EXTERNA</div>
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">¿Sabías que...?</h3>
          <p>
            El cuidador de empresa externa en convenio puede cumplir el rol de vigilancia del
            paciente y comunicar de manera oportuna al equipo de salud cualquier necesidad de
            cuidados o situación de alerta del paciente.
          </p>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-700">
              Requisitos
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>Edad: entre 18 y 65 años.</li>
              <li>Salud: sin patologías agudas ni contagiosas.</li>
              <li>
                Vacunas: deben contar con vacunación vigente (VHB, Influenza y recomendable
                COVID-19).
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-700">
              Proceso de contratación
            </h4>
            <ol className="list-decimal space-y-1 pl-5 text-sm sm:text-base">
              <li>Identificación: el equipo de enfermería determina la necesidad del cuidador.</li>
              <li>
                Alternativas: la familia puede optar por un cuidador propio o uno de empresa en
                convenio.
              </li>
              <li>
                Activación: el equipo de enfermería activará la excepción “Cuidador externo” para
                que el acompañante responsable ingrese los datos de la/s persona/s que realizarán
                esta labor en la aplicación “MIS VISITAS UC CHRISTUS”.
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-purple-700">
              Responsabilidades
            </h4>
            <ul className="list-disc space-y-1 pl-5 text-sm sm:text-base">
              <li>Mantener vigilancia continua del paciente.</li>
              <li>Comunicar alertas o necesidades al equipo de salud.</li>
              <li>
                Cumplir las normas de seguridad y control de infecciones indicadas por el personal
                clínico.
              </li>
              <li>
                En ningún caso recibir información clínica salvo autorización expresa del paciente o
                su acompañante responsable.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
