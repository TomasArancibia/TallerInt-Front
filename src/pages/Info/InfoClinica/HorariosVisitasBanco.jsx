import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";
import horarioVisitasImg from "../../../assets/HorarioAtencion.png";
import horarioBancoImg from "../../../assets/HorarioBanco.png";

export default function HorariosVisitasBanco({
  backHref = "/procesosclinicos",
  backLabel = "Menú procesos",
} = {}) {
  return (
    <main className={pageContainer}>
      <PageNav backHref={backHref} className="mb-4" backLabel={backLabel} />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>
          HORARIOS VISITAS / BANCO DE SANGRE
        </div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">¿Sabías que…?</h2>

        <div className={`${contentCard} space-y-5`}>
          <p>
            Los horarios de visitas médicas a pacientes hospitalizados en UC Christus, en las
            distintas unidades, son los siguientes:
          </p>

          <figure className="mx-auto w-full max-w-2xl">
            <img
              src={horarioVisitasImg}
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
              src={horarioBancoImg}
              alt="Tabla de horarios del banco de sangre"
              className="w-full rounded-xl border border-slate-200 object-contain shadow-sm"
            />
          </figure>
        </div>
      </div>

    </main>
  );
}
