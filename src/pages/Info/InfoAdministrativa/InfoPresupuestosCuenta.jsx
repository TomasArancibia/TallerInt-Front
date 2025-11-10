import React from "react";
import { Link } from "react-router-dom";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";

export default function InfoPresupuestosCuenta() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa"
        className="mb-4"
        backLabel="Menú información administrativa"
      />
      <Logo />
      <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border-2 border-[#3481E2] bg-[#3481E2] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
        Presupuestos, cuenta hospitalaria, pagos
      </div>
      <p className={`${helperText} mt-4 text-center`}>
        Por favor indíquenos de qué área es su consulta
      </p>

      <section className={sectionStack}>
        <Link className={actionPurple} to="/info_administrativa/presupuestos">
          Presupuestos
        </Link>
        <Link className={actionPurple} to="/info_administrativa/cuenta-hospitalaria-pagos">
          Cuenta hospitalaria y pagos
        </Link>
      </section>
    </main>
  );
}
