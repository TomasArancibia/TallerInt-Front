import React from "react";
import {
  pageContainer,
  sectionStack,
  actionBlue,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoDifVisAco() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_general_visitas" className="mb-4" backLabel="Menú general visitas" />
      <Logo />
      <section className={sectionStack}>
        <div className={`${actionBlue} pointer-events-none`}>
          DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA
        </div>
        <div className={infoText}>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Acompañante Responsable</h3>
            <p>
              Es una persona mayor de 18 años, designada por el paciente, que está autorizada para
              recibir información clínica y tomar decisiones médicas en caso de que el paciente no
              pueda hacerlo. También debe gestionar las visitas del paciente y, si el médico lo
              indica, acompañarlo 24/7 durante su estadía. En menores o personas con discapacidad,
              debe ser su representante legal. Además, es quien retira al paciente al momento del
              alta.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Visita</h3>
            <p>
              Es una persona autorizada por el paciente (o por el acompañante responsable si el
              paciente no puede decidir), que puede ingresar a visitarlo durante los horarios
              establecidos por el hospital. No puede recibir información clínica salvo autorización
              explícita del paciente o su acompañante responsable. Incluye también visitas
              significativas solicitadas por niños, niñas o adolescentes. No puede ser visita quien
              tenga una orden judicial de alejamiento.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
