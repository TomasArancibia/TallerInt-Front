import React from "react";
import {
  pageContainer,
  helperText,
  sectionStack,
  actionPurple,
  PageNav,
  Logo,
} from "../../../components/ui.jsx";
import PortalTrackedLink from "../../../components/PortalTrackedLink.jsx";

export default function InfoGesCaecLey() {
  return (
    <main className={pageContainer}>
      <PageNav
        backHref="/info_administrativa"
        className="mb-4"
        backLabel="Menú información administrativa"
      />
      <Logo />
      <div className="mx-auto mt-4 w-full max-w-xl rounded-2xl border-2 border-[#3481E2] bg-[#3481E2] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
        Información GES · CAEC · Ley de Urgencia
      </div>
      <p className={`${helperText} mt-4 text-center`}>
        Por favor indíquenos de qué área es su consulta
      </p>

      <section className={sectionStack}>
        <PortalTrackedLink
          className={actionPurple}
          to="/info_administrativa/ges"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-ges"
        >
          GES
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/info_administrativa/caec"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-caec"
        >
          CAEC
        </PortalTrackedLink>
        <PortalTrackedLink
          className={actionPurple}
          to="/info_administrativa/ley-de-urgencia"
          trackingCategory="info_administrativa"
          trackingCode="info-admin-ley-urgencia"
        >
          Ley de Urgencia
        </PortalTrackedLink>
      </section>
    </main>
  );
}
