import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoIngresoPerros() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_visitas/perros-mascotas"
        className="mb-4"
        backLabel="Menú perros y mascotas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>INGRESO DE PERROS DE ASISTENCIA</div>
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <h3 className="text-base font-semibold text-purple-700">1. Evaluación de necesidad</h3>
          <p>
            El equipo clínico responsable evaluará la posibilidad de permitir el ingreso de perros
            de asistencia considerando las condiciones de salud del paciente.
          </p>

          <h3 className="text-base font-semibold text-purple-700">2. Requisitos para el ingreso</h3>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <span className="font-semibold">Documentación:</span> se debe presentar la credencial
              de discapacidad del paciente y la credencial del binomio "usuario–perro de
              asistencia".
            </li>
            <li>
              <span className="font-semibold">Condiciones sanitarias:</span> el perro debe estar
              vacunado, desparasitado y tener un control sanitario anual. Además, debe estar limpio y
              sin parásitos.
            </li>
            <li>
              <span className="font-semibold">Comportamiento:</span> el perro debe tener un buen
              comportamiento en lugares cerrados y ser mayor de 6 meses.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-purple-700">3. Procedimiento para la visita</h3>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              <span className="font-semibold">Solicitud:</span> el equipo clínico debe gestionar la
              visita del perro, incluyendo detalles del paciente y la fecha.
            </li>
            <li>
              <span className="font-semibold">Ingreso controlado:</span> el perro debe ingresar con
              correa y arnés, y se le guiará a la habitación del paciente.
            </li>
            <li>
              <span className="font-semibold">Duración de la visita:</span> la visita puede durar
              hasta un máximo de una hora, dependiendo de la respuesta del paciente.
            </li>
          </ol>

          <h3 className="text-base font-semibold text-purple-700">4. Cuidados durante la visita</h3>
          <p>Se deben proteger los accesos venosos del paciente y asegurar la fijación de dispositivos médicos.</p>
        </div>
      </section>
    </main>
  );
}
