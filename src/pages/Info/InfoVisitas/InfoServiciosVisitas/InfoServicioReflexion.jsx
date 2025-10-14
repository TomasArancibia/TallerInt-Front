import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  sectionStack,
  actionBlue,
  infoText,
} from "../../../../components/ui.js";

export default function InfoReflexion() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>SERVICIOS DISPONIBLES</div>
        <div className={infoText}>
          <p>
            En UC CHRISTUS existen espacios dedicados a la oración y la reflexión espiritual. En el
            caso del hospital, se dispone de los siguientes espacios:
          </p>

          <h3 className="text-base font-semibold text-purple-700">Capilla San Lucas</h3>
          <p>
            Se ubica en el 1er piso del hospital y oficia los siguientes servicios:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Misa diaria: 12:00 hrs.</li>
            <li>Santo Rosario: 8:10 hrs.</li>
            <li>Adoración al Santísimo: jueves entre 12:30 y 13:00 hrs.</li>
            <li>Misa mensual para pacientes fallecidos: segundos viernes de cada mes.</li>
          </ul>

          <h3 className="text-base font-semibold text-purple-700">Oratorio San Alberto Hurtado</h3>
          <p>
            Se ubica en 4to piso del hospital y permite el ofrecimiento de oraciones por parte de
            acompañantes o familiares.
          </p>
        </div>
        <Link className={actionBlue} to="/info_servicios_visitas">
          Volver
        </Link>
      </section>
    </main>
  );
}
