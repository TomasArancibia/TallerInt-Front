import React from "react";
import {
  pageContainer,
  infoText,
  contentCard,
  PageNav,
  Logo,
  actionBlue,
} from "../../../components/ui.jsx";

import imagen1 from "../../../assets/imagen1.png";
import imagen2 from "../../../assets/imagen2.png";
import imagen3 from "../../../assets/imagen3.png";

const sectionTitle = "text-base font-semibold text-purple-700 uppercase tracking-wide";
const sectionDescription = "text-sm leading-normal text-slate-700 sm:text-base";

export default function NumeroEpisodio() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />

      <div className="mx-auto mt-5 w-full max-w-2xl">
        <div className={`${actionBlue} pointer-events-none`}>
          NÚMERO DE EPISODIO
        </div>
      </div>

      <div className={`${infoText} mt-4`}>
        <p>
          El número de episodio es un identificador único de 10 dígitos asociado a una atención de
          salud. Con este número puedes revisar en línea los resultados de exámenes (imágenes,
          laboratorios, biopsias y PAP) desde la web de UC CHRISTUS o el Portal Paciente. A
          continuación, te mostramos dónde encontrar este N° en distintos documentos.
        </p>
      </div>

      <section className="mx-auto mt-6 flex w-full max-w-3xl flex-col gap-5">
        <article className={`${contentCard} space-y-3`}>
          <p className={sectionTitle}>Detalle de cuenta episodio</p>
          <p className={sectionDescription}>
            Ubica la etiqueta “Detalle de Cuenta Episodio”. Justo al lado verás el código de 10
            dígitos resaltado.
          </p>
          <figure className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:max-w-[22rem]">
            <img
              src={imagen1}
              alt="Detalle de cuenta episodio con el número resaltado"
              className="w-full object-contain"
              loading="lazy"
            />
          </figure>
        </article>

        <article className={`${contentCard} space-y-3`}>
          <p className={sectionTitle}>Informe de cuenta al paciente</p>
          <p className={sectionDescription}>
            En el encabezado del informe encontrarás el campo “Detalle Episodio (SP o Folio)”.
            Ese es tu identificador.
          </p>
          <figure className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:max-w-[22rem]">
            <img
              src={imagen2}
              alt="Informe de cuenta al paciente mostrando el número de episodio"
              className="w-full object-contain"
              loading="lazy"
            />
          </figure>
        </article>

        <article className={`${contentCard} space-y-3`}>
          <p className={sectionTitle}>Registro de admisión</p>
          <p className={sectionDescription}>
            En este formulario el dato aparece como “Número de cuenta”. Se ubica en la primera fila y
            permite validar tu identidad en el Portal Paciente.
          </p>
          <figure className="mx-auto w-full max-w-[18rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:max-w-[22rem]">
            <img
              src={imagen3}
              alt="Registro de admisión con el número de cuenta destacado"
              className="w-full object-contain"
              loading="lazy"
            />
          </figure>
        </article>
      </section>
    </main>
  );
}
