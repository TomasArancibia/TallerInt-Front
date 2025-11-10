import React from "react";
import {
  pageContainer,
  actionBlue,
  contentCard,
  infoText,
  PageNav,
  Logo,
} from "../../../../components/ui.jsx";

export default function InfoElementosIngreso() {
  return (
    <main className={pageContainer}>
      <PageNav backHref="/info_horarios_condiciones" className="mb-4" backLabel="Menú horarios" />
      <Logo />
      <div className="mx-auto mt-6 w-full max-w-3xl">
        <div className={`${actionBlue} pointer-events-none`}>
          ELEMENTOS NO PERMITIDOS AL INGRESO DEL HOSPITAL
        </div>
      </div>

      <section className={infoText}>
        <div className={`${contentCard} space-y-4`}>
          <p>
            No está permitido el ingreso de: toallas, frazadas, globos, joyas u objetos de valor,
            dinero en efectivo, prendas de alto costo (&gt;1 UF), peluches (excepto uno de apego para
            pacientes pediátricos), notebooks, tablets, videojuegos, audífonos inalámbricos ni otros
            dispositivos móviles (el hospital no se responsabiliza por pérdidas).
          </p>
          <p>
            Tampoco se permite ingresar mamaderas, alimentos o líquidos sin autorización médica y
            sanitaria, flores, plantas, vaporizadores, cigarros electrónicos, delivery de comida,
            aparatos eléctricos o de cocción (televisores, microondas, hervidores, etc.), drogas,
            alcohol, tabaco, armas o elementos cortopunzantes.
          </p>
          <p>
            Solo se autoriza el ingreso de maletas pequeñas tipo cabina (55×35×25 cm).
          </p>
        </div>
      </section>
    </main>
  );
}
