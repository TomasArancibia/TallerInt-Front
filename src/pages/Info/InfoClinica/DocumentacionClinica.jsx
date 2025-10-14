import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-ucchristus.png";
import {
  pageContainer,
  logoClass,
  actionBlue,
  contentCard,
} from "../../../components/ui.js";

export default function DocumentacionClinica() {
  return (
    <main className={pageContainer}>
      <img src={logo} alt="Logo UC Christus" className={logoClass} />
      <div className={`${actionBlue} pointer-events-none`}>DOCUMENTACIÓN CLÍNICA</div>

      <div className="mx-auto mt-4 w-full max-w-3xl space-y-5 text-center text-sm leading-relaxed text-slate-700">
        <h2 className="text-base font-semibold text-purple-700">¿Qué es cada documento?</h2>

        <div className={`${contentCard} space-y-4 text-center`}>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Ficha Clínica</h3>
            <p>
              Documento legal que contiene antecedentes de salud, atenciones y procedimientos
              realizados. Es personal y se resguarda con confidencialidad.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Epicrisis</h3>
            <p>
              Resumen del proceso de hospitalización: diagnóstico, evolución, indicaciones y
              controles. Se entrega al alta o cuando lo indique el equipo tratante.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-purple-700">Protocolo operatorio</h3>
            <p>
              Informe del acto quirúrgico con técnica empleada, hallazgos y eventuales indicaciones.
            </p>
          </div>
        </div>

        <h2 className="text-base font-semibold text-purple-700">¿Cómo solicitar una copia?</h2>
        <div className={`${contentCard} text-center`}>
          <p>
            La entrega de copias se realiza al paciente o a su representante legal con la
            autorización correspondiente. Consulta el canal formal del hospital para solicitudes
            de ficha o informes.
          </p>
        </div>
      </div>

      <Link className={`${actionBlue} mt-6 w-full max-w-2xl`} to="/procesosclinicos">
        Volver
      </Link>
    </main>
  );
}
