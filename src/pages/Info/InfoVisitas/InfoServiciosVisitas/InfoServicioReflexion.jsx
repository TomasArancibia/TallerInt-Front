import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoReflexion() {
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
          <p>
            En UC CHRISTUS existen espacios dedicados a la oración y la reflexión espiritual. En el
            hospital cuentas con los siguientes lugares:
          </p>

          <h3 className="text-base font-semibold text-purple-700">Capilla San Lucas</h3>
          <p>Ubicada en el 1er piso del hospital, ofrece:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Misa diaria: 12:00 hrs.</li>
            <li>Santo Rosario: 08:10 hrs.</li>
            <li>Adoración al Santísimo: jueves entre 12:30 y 13:00 hrs.</li>
            <li>Misa mensual para pacientes fallecidos: segundo viernes de cada mes.</li>
          </ul>

          <h3 className="text-base font-semibold text-purple-700">Oratorio San Alberto Hurtado</h3>
          <p>
            Espacio ubicado en el 4to piso donde acompañantes y familiares pueden ofrecer oraciones
            de manera tranquila.
          </p>
        </div>
      </section>
    </main>
  );
}
