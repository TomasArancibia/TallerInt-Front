import React from "react";
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

        <article className={`${contentCard} space-y-4`}>
          <p>
            Con el objetivo de agilizar el proceso de agendamiento, hemos dispuesto una sección en
            nuestro sitio web donde puede solicitar una cita médica, kinesiológica, nutricional, entre
            otras.
          </p>
          <p>Para acceder a esta información pulsa a continuación:</p>
          <div className="flex justify-center">
            <a
              className={inlineCta}
              href="https://agenda.ucchristus.cl/reserva-horas/busqueda?area=RIS_IMAGENES&origin=mkt&gad_source=1&gad_campaignid=23184070207&gbraid=0AAAAABkEex20H99Yt951lpOifM3s9LHqU&gclid=CjwKCAiAlMHIBhAcEiwAZhZBUrJqEPvZrdzaCJ6HgMuie9o5zQpvb0l46w-mYHsTZYj3dZQN-zv8dxoCRskQAvD_BwE"
              target="_blank"
              rel="noreferrer"
            >
              Agendar cita
            </a>
          </div>
        </article>
      </div>

    </main>
  );
}
