import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoIngresoMascotas() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_visitas/perros-mascotas"
        className="mb-4"
        backLabel="Menú perros y mascotas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>INGRESO DE MASCOTAS</div>
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">1. Evaluación de necesidad</h3>
          <p>
            El equipo clínico responsable evaluará la posibilidad de permitir el ingreso de la
            mascota (perro o gato), considerando las condiciones de salud del paciente y su
            necesidad de ver a su animal.
          </p>

          <h3 className="text-base font-semibold text-purple-700">2. Requisitos para el ingreso</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">Carnet de vacunación:</span> la mascota debe tener un
              carnet de vacunación completo y un estado de salud compatible para ingresar al
              hospital.
            </li>
            <li>
              <span className="font-semibold">Condiciones sanitarias:</span> debe estar limpia, sin
              parásitos, y haber sido aseada un día antes de la visita.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-purple-700">3. Procedimiento para la visita</h3>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              <span className="font-semibold">Solicitud previa:</span> el equipo clínico debe
              gestionar la visita de la mascota, incluyendo detalles del paciente y la fecha.
            </li>
            <li>
              <span className="font-semibold">Ingreso controlado:</span> la mascota debe ingresar en
              un transportador o con correa y arnés.
            </li>
            <li>
              <span className="font-semibold">Duración de la visita:</span> al igual que con los
              perros de asistencia, la visita puede durar hasta una hora.
            </li>
          </ol>

          <h3 className="text-base font-semibold text-purple-700">4. Consideraciones especiales</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">Prohibiciones:</span> no se permite el contacto entre
              perros o gatos con otros animales que ingresen por procedimientos diferentes.
            </li>
            <li>
              <span className="font-semibold">Evaluación de riesgos:</span> en situaciones donde el
              paciente esté inmunocomprometido, se evaluará el riesgo de permitir la visita de la
              mascota.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
