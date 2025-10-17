import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoInstalaciones() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_servicios_visitas"
        className="mb-4"
        backLabel="Menú servicios"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>SERVICIOS DISPONIBLES</div>
      </div>
      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">Cajero automático</h3>
          <p>
            Se encuentra en el 1er piso de la salida norte del hospital clínico (sector G).
          </p>

          <h3 className="text-base font-semibold text-purple-700">Wifi</h3>
          <p>
            En el hospital clínico como en la Clínica UC existe red Wi-Fi de libre disposición para
            nuestros pacientes y familias.
          </p>
          <h3 className="text-base font-semibold text-purple-700">Estacionamientos</h3>
          <p>
            A nuestros pacientes hospitalizados, en que su régimen de ingreso sea de{" "}
            <strong className="text-purple-700">habitación individual</strong> en el hospital
            clínico y Clínica UC, se les proveerá de un pase liberado para ser utilizado en el
            estacionamiento ubicado en Lira 85. Este pase tiene validez por toda la estadía del
            paciente y debe ser retirado en Admisión Hospital Clínico, 1° piso hall central.
          </p>
          <p>
            En caso de otros tipos de regímenes de hospitalización, podrá solicitar ticket de
            descuento (estacionamiento Lira 85) en el mesón de informaciones, ubicado en el 1er piso
            del hospital clínico en horario hábil. Este ticket no es acumulable.
          </p>
        </div>
      </section>
    </main>
  );
}
