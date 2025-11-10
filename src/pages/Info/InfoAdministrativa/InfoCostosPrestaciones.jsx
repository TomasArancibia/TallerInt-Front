import React from "react";
import {
  pageContainer,
  helperText,
  contentCard,
  inlineCta,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoCostosPrestaciones() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa"
        className="mb-4"
        backLabel="Menú información administrativa"
      />
      <Logo />
      <div className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 sm:text-sm">
        Costo de prestaciones
      </div>

      <section className={infoText}>
        <h1 className="text-lg font-semibold text-purple-700 sm:text-xl">
          Aranceles UC Christus
        </h1>
        <p className={`${helperText} sm:text-base`}>
          Con el objetivo de garantizar el acceso a la información, hemos dispuesto una sección
          en nuestro sitio web donde puedes consultar los aranceles hospitalarios vigentes.
        </p>

        <div className={`${contentCard} space-y-4`}>
          <p>
            Para acceder a este detalle pulsa a continuación. Ahí encontrarás los valores
            actualizados de nuestros servicios y procedimientos.
          </p>
          <div className="flex justify-start">
            <a
              className={inlineCta}
              href="https://www.ucchristus.cl/informacion-al-paciente/aranceles"
              target="_blank"
              rel="noreferrer"
            >
              Aranceles
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
