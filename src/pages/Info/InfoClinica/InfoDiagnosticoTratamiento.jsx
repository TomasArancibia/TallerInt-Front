import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoDiagnosticoTratamiento() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>
          INFORMACIÓN SOBRE DIAGNÓSTICO O TRATAMIENTO
        </div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">¿Sabías que…?</h2>

        <div className={`${contentCard} space-y-4`}>
          <p>
            Solo cirujanos y equipos médicos tratantes pueden entregar información de diagnóstico
            y tratamiento clínico del paciente.
          </p>
          <p>
            Por Ley 20.584 de Derechos y Deberes de Pacientes, solo el paciente y su{" "}
            <Link
              to="/info_rol_resp"
              className="font-semibold text-purple-700 underline"
            >
              Acompañante Responsable
            </Link>{" "}
            podrán recibir información clínica sobre tratamientos, procedimientos o cirugías
            realizadas, mientras el paciente esté hospitalizado o en atención ambulatoria.
          </p>
          <p>
            Las visitas no están autorizadas a recibir información clínica del paciente, a menos
            que el mismo paciente o el acompañante responsable de menores de edad lo autoricen
            explícitamente.
          </p>
          <p className="text-sm text-slate-600">
            Si necesitas aclaraciones, solicita una conversación con el equipo tratante o agenda
            un control.
          </p>
        </div>
      </div>

    </main>
  );
}
