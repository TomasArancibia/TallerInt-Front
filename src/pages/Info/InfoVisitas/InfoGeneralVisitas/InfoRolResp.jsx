import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoRolResp() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_general_visitas"
        className="mb-4"
        backLabel="Menú general visitas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>ROL DEL ACOMPAÑANTE</div>
      </div>
      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <p>
            El acompañante responsable tiene un rol clave en su atención médica. Sus funciones
            incluyen:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Recibir información clínica del equipo tratante.</li>
            <li>Tomar decisiones médicas en caso de que el paciente no pueda hacerlo.</li>
            <li>Gestionar las visitas del paciente.</li>
            <li>
              Acompañar al paciente 24/7 durante su estadía, si el médico lo indica, o coordinar a
              alguien que lo haga.
            </li>
            <li>Apoyar en el alta, retirando al paciente con sus pertenencias.</li>
          </ul>
          <h3 className="text-base font-semibold text-purple-700">Casos especiales</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Menores de edad: hasta 2 acompañantes, deben ser padres o representantes legales y
              estar disponibles las 24 horas mientras dure la atención.
            </li>
            <li>
              Adultos con condiciones de neurodesarrollo: debe ser su representante legal y estar
              disponible permanentemente.
            </li>
            <li>
              Adultos con discapacidad cognitiva o demencia: se prioriza a un familiar cercano que
              acompañe durante toda la estadía.
            </li>
            <li>
              Pacientes inconscientes o sin capacidad: se prioriza a cónyuge, padres o hijos
              mayores.
            </li>
          </ul>
          <p>
            Este acompañante es el único con autorización para acceder a la información médica y
            coordinar apoyos durante la estadía del paciente.
          </p>
        </div>
      </section>
    </main>
  );
}
