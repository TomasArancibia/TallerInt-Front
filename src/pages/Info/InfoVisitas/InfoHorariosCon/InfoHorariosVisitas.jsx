import React from "react";
import horarioVisitas from "../../../../assets/HorarioAtencion.png";
import horarioBanco from "../../../../assets/HorarioBanco.png";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoHoriariosVisitas() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_horarios_condiciones"
        className="mb-4"
        backLabel="Menú horarios"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>HORARIOS DE VISITAS</div>
      </div>
      <section className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">¿Sabías que…?</h2>
        <div className={`${contentCard} space-y-5`}>
          <p>
            Los horarios de visitas médicas a pacientes hospitalizados en UC Christus, en las
            distintas unidades, son los siguientes:
          </p>
          <figure className="mx-auto w-full max-w-2xl">
            <img
              src={horarioVisitas}
              alt="Cuadro de horarios de visitas por unidad"
              className="w-full rounded-xl border border-slate-200 object-contain shadow-sm"
            />
          </figure>
          <p>
            El horario de banco de sangre es de lunes a viernes con última emisión de ticket a las
            16:45 hrs. Sábados, domingos y festivos cerrado.
          </p>
          <figure className="mx-auto w-full max-w-2xl">
            <img
              src={horarioBanco}
              alt="Tabla de horarios del banco de sangre"
              className="w-full rounded-xl border border-slate-200 object-contain shadow-sm"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
