import React from "react";
import logo from "../../../../assets/logo-ucchristus.png";
import horarioVisitas from "../../../../assets/HorarioAtencion.png";
import horarioBanco from "../../../../assets/HorarioBanco.png";
import { Link } from "react-router-dom";
import {
  pageContainer,
  logoClass,
  sectionStack,
  actionBlue,
  infoText,
} from "../../../../components/ui.js";

export default function InfoHoriariosVisitas() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>HORARIOS DE VISITAS</div>
        <div className={`${infoText} text-center`}>
          <h3 className="text-base font-semibold text-purple-700">¿Sabías que...?</h3>
          <p>
            Los horarios de visitas médicas a pacientes hospitalizados en UC Christus, en las
            distintas unidades, son los siguientes:
          </p>
          <img
            src={horarioVisitas}
            alt="Horario de visitas"
            className="mx-auto w-full max-w-xl rounded-lg shadow-sm"
          />
          <p>
            El horario de banco de sangre es de lunes a viernes (última emisión de ticket 16:45 hrs).
            Sábados, domingos y festivos cerrado.
          </p>
          <img
            src={horarioBanco}
            alt="Horario de Banco de Sangre"
            className="mx-auto w-full max-w-xl rounded-lg shadow-sm"
          />
        </div>
        <Link className={actionBlue} to="/info_horarios_condiciones">
          Volver
        </Link>
      </section>
    </main>
  );
}
