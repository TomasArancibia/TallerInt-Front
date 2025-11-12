import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  pageContainer,
  helperText,
  contentCard,
  inlineCta,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoCuentaPagos() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa/presupuestos-cuenta"
        className="mb-4"
        backLabel="Volver a presupuestos y pagos"
      />
      <Logo />
      <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border-2 border-[#3481E2] bg-[#3481E2] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
        Cuenta hospitalaria y pagos
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-5`}>
          <div>
            <h1 className="text-lg font-semibold text-purple-700 sm:text-xl">
              ¿Dónde puedo revisar mi cuenta hospitalaria y hacer mis pagos?
            </h1>
            <p className={`${helperText} sm:text-base`}>
              Si necesitas conocer el estado de tu cuenta, revisar el detalle de las prestaciones
              cobradas o pagarla, puedes realizarlo a través de nuestra página web.
            </p>
          </div>
          <div className="flex justify-start">
            <a
              className={inlineCta}
              href="https://pagos.ucchristus.cl/"
              target="_blank"
              rel="noreferrer"
            >
              Paga aquí
            </a>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-semibold text-purple-700 sm:text-lg">
              ¿Dónde puedo recibir mayor orientación?
            </h2>
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-purple-700" />
              <p>
                Marcoleta 328, Torre 9, Local 2, 1er piso (En peatonal entre Marcoleta y Diagonal
                Paraguay), Santiago Centro.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faCalendar} className="mt-1 text-purple-700" />
              <p>
                De lunes a viernes: 08:30 a 17:00, última entrega de ticket a las 16:50 hrs.
                Sábados, domingos y festivos cerrado.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              Si requieres atención telefónica del área de pago de cuenta y/o recaudación, puedes
              llamar al siguiente número:
            </p>
            <div className="flex justify-start">
              <a className={inlineCta} href="tel:6003814200">
                Llamar aquí
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
