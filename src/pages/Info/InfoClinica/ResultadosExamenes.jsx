import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  inlineCta,
  infoText,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function ResultadosExamenes() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/procesosclinicos" className="mb-4" backLabel="Menú procesos" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>RESULTADOS DE EXÁMENES</div>
      </div>

      <div className={infoText}>
        <h2 className="text-lg font-semibold text-purple-700">
          ¿Dónde puedo ver mis exámenes?
        </h2>

        <article className={`${contentCard} space-y-4`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Opción A · Desde la página web
            </p>
            <p className="mt-1 text-base font-semibold text-purple-700">
              Consulta directa en Laboratorio o Imágenes
            </p>
          </div>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Selecciona “Laboratorio” o “Imágenes” según el tipo de estudio que quieras revisar.
            </li>
            <li>Ingresa tu RUT y el número de episodio (SP o Folio) de 10 dígitos.</li>
            <li>Acepta los términos para ver, descargar o imprimir los resultados disponibles.</li>
          </ol>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              className={inlineCta}
              href="https://laboratorio.ucchristus.cl/"
              target="_blank"
              rel="noreferrer"
            >
              Laboratorio
            </a>
            <a
              className={inlineCta}
              href="https://imagenologia.ucchristus.cl/"
              target="_blank"
              rel="noreferrer"
            >
              Imágenes
            </a>
          </div>
        </article>

        <article className={`${contentCard} space-y-4`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Opción B · Desde Portal Paciente
            </p>
            <p className="mt-1 text-base font-semibold text-purple-700">
              Plataforma integral para revisar tus antecedentes clínicos
            </p>
          </div>
          <p>
            Portal Paciente permite acceder a exámenes, órdenes médicas, recetas, atenciones y más,
            todo en un mismo lugar y con distintos periodos de tiempo.
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Ingresa a{" "}
              <a
                className="text-purple-700 underline"
                href="https://mi.ucchristus.cl/Usuarios/Login?ReturnUrl=%2F"
                target="_blank"
                rel="noreferrer"
              >
                mi.ucchristus.cl
              </a>{" "}
              y selecciona “Portal Paciente”.
            </li>
            <li>
              Crea tu cuenta completando los datos solicitados, valida con el código enviado a tu
              correo y define una contraseña.
            </li>
            <li>
              Dentro de “Mis Resultados” ingresa tu número de episodio (SP o Folio) la primera vez
              para verificar tu identidad. Luego podrás ver, descargar o imprimir exámenes de
              laboratorio, imágenes, biopsias o PAP.
            </li>
          </ol>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              className={inlineCta}
              href="https://mi.ucchristus.cl/Usuarios/Login?ReturnUrl=%2F"
              target="_blank"
              rel="noreferrer"
            >
              Portal Paciente
            </a>
          </div>
        </article>
      </div>

    </main>
  );
}
