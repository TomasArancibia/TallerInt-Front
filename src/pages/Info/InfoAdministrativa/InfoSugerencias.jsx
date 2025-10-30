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

export default function InfoSugerencias() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa"
        className="mb-4"
        backLabel="Menú información administrativa"
      />
      <Logo />
      <div className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 sm:text-sm">
        Sugerencias, reclamos y felicitaciones
      </div>

      <section className={infoText}>
        <h1 className="text-lg font-semibold text-purple-700 sm:text-xl">
          ¿Tienes alguna sugerencia, reclamo o felicitación?
        </h1>
        <p className={`${helperText} sm:text-base`}>
          Nos importa tu opinión. Si deseas enviarnos un comentario, expresar una felicitación o
          compartir alguna situación que requiera atención, puedes hacerlo fácilmente aquí.
        </p>

        <div className={`${contentCard} space-y-4`}>
          <div className="flex justify-start">
            <Link className={inlineCta} to="/info_administrativa/sugerencias">
              Contáctanos
            </Link>
          </div>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="font-semibold text-purple-700">
              Solo debes seguir estos pasos:
            </p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Accede al formulario.</li>
              <li>
                Completa tus datos: ingresa tu nombre, correo electrónico y cualquier otro dato
                requerido.
              </li>
              <li>Selecciona el motivo del mensaje.</li>
              <li>Escribe tu mensaje y cuéntanos tu experiencia.</li>
              <li>Envía el formulario. ¡Tu mensaje llegará directamente a nuestro equipo!</li>
            </ol>
          </div>
        </div>

        <p className="text-sm font-semibold text-purple-700 sm:text-base">
          ¡Tu retroalimentación nos ayuda a mejorar día a día!
        </p>
      </section>
    </main>
  );
}
