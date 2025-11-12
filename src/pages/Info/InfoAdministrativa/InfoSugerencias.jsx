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

export default function InfoSugerencias() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa"
        className="mb-4"
        backLabel="Menú información administrativa"
      />
      <Logo />
      <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border-2 border-[#3481E2] bg-[#3481E2] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
        Sugerencias, reclamos y felicitaciones
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <div>
            <h1 className="text-lg font-semibold text-purple-700 sm:text-xl">
              ¿Tienes alguna sugerencia, reclamo o felicitación?
            </h1>
            <p className={`${helperText} sm:text-base`}>
              Nos importa tu opinión. Si deseas enviarnos un comentario, expresar una felicitación o
              compartir alguna situación que requiera atención, puedes hacerlo fácilmente aquí.
            </p>
          </div>
          <div className="flex justify-start">
            <a
              className={inlineCta}
              href="https://contactenos.ucchristus.cl/"
              target="_blank"
              rel="noreferrer"
            >
              Contáctanos
            </a>
          </div>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="font-semibold text-purple-700">
              Solo debes seguir estos pasos:
            </p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                Selecciona el tipo de caso: elige si deseas registrar un Reclamo, Sugerencia,
                Solicitud o Felicitación.
              </li>
              <li>
                Ingresa tus datos personales: escribe tu nombre, apellidos, RUT/DNI/pasaporte (sin
                puntos ni guion), teléfono y correo electrónico.
              </li>
              <li>
                Selecciona la información del caso: elige el Centro, Ubicación, Área, Sector,
                Categoría y Subcategoría según corresponda.
              </li>
              <li>
                Describe tu caso: explica brevemente el motivo del mensaje y cuál es tu solicitud o
                comentario específico.
              </li>
              <li>
                Indica si eres el paciente: marca “Sí” o “No”.
                <ul className="list-disc pl-5">
                  <li>
                    Si no eres el paciente, completa también los datos del paciente (nombre,
                    apellidos, RUT, teléfono y correo).
                  </li>
                </ul>
              </li>
              <li>Adjunta documentos si es que corresponde.</li>
              <li>
                Revisa y envía el formulario una vez que toda la información esté completa.
              </li>
            </ol>
          </div>

          <p className="text-sm font-semibold text-purple-700 sm:text-base">
            ¡Tu retroalimentación nos ayuda a mejorar día a día!
          </p>
        </div>
      </section>
    </main>
  );
}
