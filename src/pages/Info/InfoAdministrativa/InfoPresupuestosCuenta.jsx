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
      <div className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-200 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 sm:text-sm">
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
