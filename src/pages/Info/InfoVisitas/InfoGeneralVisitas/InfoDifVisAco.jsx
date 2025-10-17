import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoDifVisAco() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_general_visitas"
        className="mb-4"
        backLabel="Menú general visitas"
      />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>
          DIFERENCIA ENTRE ACOMPAÑANTE Y VISITA
        </div>
      </div>
      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Acompañante responsable</h3>
            <p>
              Persona mayor de 18 años designada por el paciente, autorizada para recibir
              información clínica y tomar decisiones médicas cuando el paciente no pueda hacerlo.
              Gestiona las visitas y, si el equipo tratante lo indica, acompaña al paciente de forma
              continua. En menores o personas con discapacidad debe ser su representante legal y
              se encarga también de retirarlo al alta.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Visita</h3>
            <p>
              Persona autorizada por el paciente o su acompañante responsable para ingresar durante
              los horarios establecidos. No recibe información clínica salvo autorización expresa.
              Incluye visitas significativas solicitadas por niños, niñas o adolescentes y se
              excluye a quienes tengan orden judicial de alejamiento.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
