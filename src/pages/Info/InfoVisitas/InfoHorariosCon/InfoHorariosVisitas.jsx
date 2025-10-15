import React from "react";
import horarioVisitas from "../../../../assets/HorarioAtencion.png";
import horarioBanco from "../../../../assets/HorarioBanco.png";
import {
  pageContainer,
  sectionStack,
  actionBlue,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoHoriariosVisitas() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_horarios_condiciones" className="mb-4" backLabel="Menú horarios" />
      <Logo />
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
      </section>
    </main>
  );
}
