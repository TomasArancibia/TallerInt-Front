import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  contentCard,
  inlineCta,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoPresupuestos() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa/presupuestos-cuenta"
        className="mb-4"
        backLabel="Volver a presupuestos y pagos"
      />
      <Logo />
      <div className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 sm:text-sm">
        Presupuestos
      </div>

      <section className={infoText}>
        <h1 className="text-lg font-semibold text-purple-700 sm:text-xl">
          ¿Dónde puedo obtener un presupuesto?
        </h1>
        <p className={`${helperText} sm:text-base`}>
          Con el objetivo de facilitar la experiencia de nuestros pacientes, existen dos formas
          para solicitar presupuestos médicos según el tipo de atención requerida.
        </p>

        <div className={`${contentCard} space-y-6`}>
          <article className="space-y-3">
            <h2 className="text-base font-semibold text-purple-700 sm:text-lg">
              Presupuesto de cirugía
            </h2>
            <p>
              Para cotizar una intervención quirúrgica, haz clic en el botón a continuación. Serás
              redirigido a nuestra página web, donde encontrarás un formulario para ingresar los
              datos necesarios y gestionar tu solicitud.
            </p>
            <div className="flex justify-start">
              <Link className={inlineCta} to="/info_administrativa/presupuestos">
                Cotiza aquí
              </Link>
            </div>
          </article>

          <article className="space-y-3">
            <h2 className="text-base font-semibold text-purple-700 sm:text-lg">
              Presupuesto de exámenes o procedimientos
            </h2>
            <p>
              Si necesitas obtener un presupuesto para exámenes o procedimientos, comunícate con
              nosotros y marca la opción correspondiente:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Opción 2: Procedimientos</li>
              <li>Opción 3: Exámenes de imágenes</li>
              <li>Opción 4: Laboratorio clínico</li>
            </ul>
            <div className="flex justify-start">
              <Link className={inlineCta} to="/info_administrativa/presupuestos">
                Llamar aquí
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
