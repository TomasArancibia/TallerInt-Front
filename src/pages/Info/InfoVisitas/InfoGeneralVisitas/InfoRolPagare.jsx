import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCalendar } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  logoClass,
  sectionStack,
  actionBlue,
  infoText,
} from "../../../../components/ui.js";

export default function InfoResPagare() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>ROL RESPONSABLE DE PAGARÉ</div>
        <div className={`${infoText} text-center`}>
          <h3 className="text-base font-semibold text-purple-700">¿Sabías que...?</h3>
          <p>
            El responsable del pagaré es la persona que firma el pagaré de cuenta hospitalaria.
            Puede ser el mismo paciente, acompañante, representante legal o tercera persona. Tiene
            responsabilidad financiera con la institución sobre la cuenta hospitalaria del paciente.
            La institución no está obligada a entregar información clínica al responsable del
            pagaré, si no es el mismo paciente o acompañante responsable declarado.
          </p>
          <h3 className="text-base font-semibold text-purple-700">
            ¿Dónde puedo recibir mayor orientación?
          </h3>
          <div className="flex items-start gap-3 text-left">
            <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-purple-700" />
            <p>
              Marcoleta 367, 1er piso, Hospital Clínico UC CHRISTUS, Santiago Centro
            </p>
          </div>
          <div className="flex items-start gap-3 text-left">
            <FontAwesomeIcon icon={faCalendar} className="mt-1 text-purple-700" />
            <p>
              De lunes a jueves: 09:00 a 16:30. Viernes de 09:00 a 15:30 hrs. Sábados, domingos y
              festivos cerrado.
            </p>
          </div>
        </div>
        <Link className={actionBlue} to="/info_general_visitas">
          Volver
        </Link>
      </section>
    </main>
  );
}
