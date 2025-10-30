import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoGes() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa/ges-caec-ley"
        className="mb-4"
        backLabel="Volver a GES · CAEC · Ley de Urgencia"
      />
      <Logo />

      <section className={infoText}>
        <h1 className="text-lg font-semibold uppercase tracking-wide text-purple-700 sm:text-xl">
          Convenios especiales
        </h1>

        <div className={`${contentCard} space-y-4`}>
          <h2 className="text-base font-semibold text-purple-700 sm:text-lg">
            Garantías Explícitas en Salud (GES)
          </h2>

          <p>
            Es un sistema de salud en Chile que asegura la cobertura de 87 enfermedades y
            condiciones a través de garantías explícitas de acceso, oportunidad, protección
            financiera y calidad. Funciona tanto para afiliados FONASA como ISAPRE.
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
