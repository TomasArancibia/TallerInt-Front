import React from "react";
import {
  pageContainer,
  sectionStack,
  actionBlue,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoHorariosEntrada() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_horarios_condiciones" className="mb-4" backLabel="Menú horarios" />
      <Logo />
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>CONDICIONES DE ENTRADA</div>
        <div className={infoText}>
          <h3 className="text-center text-base font-semibold text-purple-700">
            ¿Qué debo cumplir para ser visita?
          </h3>
          <p>
            Las visitas deben ser mayores de 12 años; sin embargo, se permite el ingreso de menores
            de 12 años en estos casos:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Hijos(as) o hermanos(as) de pacientes hospitalizados por más de 12 días.</li>
            <li>Visitas significativas para pacientes en cirugía de alto riesgo o en fin de vida.</li>
            <li>Lactantes hijos(as) de pacientes o acompañantes hospitalizados.</li>
            <li>
              Menores que requieran acompañar a un adulto en Urgencia, Imágenes o Banco de Sangre.
            </li>
          </ul>
          <p>Siempre deben estar acompañados de un adulto responsable.</p>
          <h3 className="text-base font-semibold text-purple-700">Condiciones sanitarias de ingreso</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Higiene de manos obligatoria al entrar o salir de salas.</li>
            <li>Uso de mascarilla si presenta síntomas respiratorios.</li>
            <li>Seguir instrucciones del personal ante señaléticas especiales.</li>
          </ul>
          <h3 className="text-base font-semibold text-purple-700">Restricción por síntomas</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Visitas o acompañantes con tos, fiebre u otros síntomas no pueden ingresar.</li>
            <li>
              En caso de síntomas, el acompañante debe ser reemplazado e informado al equipo clínico.
            </li>
          </ul>
          <h3 className="text-base font-semibold text-purple-700">Seguridad del paciente</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>El hospital puede restringir el ingreso si se incumplen estas condiciones.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
