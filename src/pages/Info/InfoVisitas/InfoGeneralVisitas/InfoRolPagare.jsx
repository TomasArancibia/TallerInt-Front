import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoResPagare() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_general_visitas"
        className="mb-4"
        backLabel="Menú general visitas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>ROL RESPONSABLE DE PAGARÉ</div>
      </div>
      <section className={infoText}>
        <div className={`${contentCard} space-y-5`}>
          <h3 className="text-base font-semibold text-purple-700">¿Sabías que...?</h3>
          <p>
            El responsable del pagaré es quien firma la cuenta hospitalaria. Puede ser el paciente,
            un acompañante, el representante legal u otra persona. Tiene responsabilidad financiera
            con la institución y solo accederá a información clínica si cuenta con la autorización
            correspondiente.
          </p>
          <h3 className="text-base font-semibold text-purple-700">
            ¿Dónde puedo recibir mayor orientación?
          </h3>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-purple-700" />
            <p>
              Marcoleta 367, 1er piso, Hospital Clínico UC CHRISTUS, Santiago Centro.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faCalendar} className="mt-1 text-purple-700" />
            <p>
              De lunes a jueves: 09:00 a 16:30. Viernes: 09:00 a 15:30 hrs. Sábados, domingos y
              festivos cerrado.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
