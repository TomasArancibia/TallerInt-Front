import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  contentCard,
  infoText,
  PageNav,
  Logo,
  actionBlue,
} from "../../../components/ui.jsx";

export default function InfoLeyUrgencia() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa/ges-caec-ley"
        className="mb-4"
        backLabel="Volver a GES · CAEC · Ley de Urgencia"
      />
      <Logo />

      <div className="mx-auto mt-4 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>INFORMACIÓN LEY DE URGENCIA</div>
      </div>

      <section className={infoText}>
        <h1 className="text-lg font-semibold uppercase tracking-wide text-purple-700 sm:text-xl">
          Convenios especiales
        </h1>

        <div className={`${contentCard} space-y-4`}>
          <h2 className="text-base font-semibold text-purple-700 sm:text-lg">
            Ley de Urgencia
          </h2>

          <p>
            Garantiza que toda persona reciba atención inmediata en cualquier centro de salud
            ante una urgencia vital. Además, permite financiar esa atención mediante un préstamo
            legal, desde el ingreso hasta la estabilización del paciente.
          </p>

          <h3 className="text-base font-semibold text-purple-700">
            ¿Dónde puedo recibir mayor orientación de este convenio?
          </h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-purple-700" />
              <p>
                Marcoleta 367, 1er piso, Hospital Clínico UC CHRISTUS, Santiago Centro.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCalendar} className="mt-1 text-purple-700" />
              <p>
                De lunes a jueves: 08:30 a 17:30 (última emisión de ticket 17:15). Viernes:
                08:30 a 16:30 (última emisión de ticket 16:15). Domingo, sábado y festivos
                cerrado.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
