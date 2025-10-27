import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function DocumentacionClinica() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>DOCUMENTACIÓN CLÍNICA</div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">¿Qué es cada documento?</h2>

        <div className={`${contentCard} space-y-4`}>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Ficha Clínica</h3>
            <p>
              Documento legal que contiene antecedentes de salud, atenciones y procedimientos
              realizados. Es personal y se resguarda con confidencialidad.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Epicrisis</h3>
            <p>
              Resumen del proceso de hospitalización: diagnóstico, evolución, indicaciones y
              controles. Se entrega al alta o cuando lo indique el equipo tratante.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Protocolo operatorio</h3>
            <p>
              Informe del acto quirúrgico con técnica empleada, hallazgos y eventuales indicaciones.
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-purple-700">
          ¿Dónde puedo conseguir una copia de estos documentos?
        </h2>
        <div className={`${contentCard} space-y-3`}>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-purple-700" />
            <p>
              Unidad Atención Paciente y Familia (Marcoleta 367, 1er piso, Hospital Clínico UC
              CHRISTUS, Santiago Centro).
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faCalendar} className="mt-1 text-purple-700" />
            <p>
              De lunes a jueves: 09:00 a 16:30 (última emisión de ticket 16:15). Viernes: 09:00 a
              15:30. Domingo, sábado y festivos cerrado.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-purple-700" />
            <p>
              <a
                className="text-purple-700 underline"
                href="mailto:paciente.hospitalizado@ucchristus.cl"
              >
                paciente.hospitalizado@ucchristus.cl
              </a>
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}
