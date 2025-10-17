/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";
import logoAsset from "../assets/logo-ucchristus.png";

export const pageContainer =
  "flex min-h-screen w-full flex-col items-center bg-slate-100 px-4 pb-14 pt-6 text-center sm:px-6 sm:pb-16";

export const logoWrapper =
  "mx-auto w-full max-w-[20rem] sm:max-w-[24rem]";

export const logoClass =
  "w-full h-auto object-contain";

export const helperText = "mt-2 text-sm text-slate-600 sm:text-base";

export const sectionStack =
  "mt-6 flex w-full max-w-xl flex-col gap-3 sm:max-w-2xl";

export const buttonBase =
  "w-full rounded-2xl border border-purple-700 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-300 sm:text-base";

export const infoCard =
  "rounded-2xl bg-white p-5 text-left text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 sm:text-base";

export const actionBlue =
  `${buttonBase} border-blue-700 bg-blue-600 text-white hover:bg-blue-700`;

export const actionPurple =
  `${buttonBase} border-purple-700 bg-purple-700 text-white hover:bg-purple-800`;

export const actionWhite =
  `${buttonBase} border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200`;

export const actionSky =
  `${buttonBase} border-indigo-300 bg-indigo-100 text-slate-900 hover:bg-indigo-200`;

export const actionStatic =
  `${buttonBase} border-blue-700 bg-blue-600 text-white cursor-default pointer-events-none`;

export const viewContainer =
  "w-full max-w-4xl px-4 pb-10 pt-4 sm:px-6";

export const contentWrapper =
  "mx-auto mt-4 w-full max-w-3xl text-left text-sm leading-relaxed text-slate-700 sm:text-base";

export const contentCard =
  "mx-auto mt-3 w-full max-w-3xl rounded-2xl bg-white px-5 py-4 text-left text-sm leading-relaxed text-slate-700 shadow-md ring-1 ring-slate-200 sm:text-base";

export const inlineCta =
  "mt-4 inline-flex items-center justify-center rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-transform duration-150 hover:-translate-y-0.5 hover:bg-purple-800 focus:outline-none focus-visible:ring focus-visible:ring-purple-300 sm:px-5 sm:py-2.5";

export const infoText =
  "mx-auto mt-6 w-full max-w-3xl space-y-5 text-left text-sm leading-relaxed text-slate-700 sm:text-base";

export const logoSrc = logoAsset;

export function Logo({
  className = logoClass,
  alt = "UC Christus",
  wrapperClassName = logoWrapper,
}) {
  return (
    <div className={wrapperClassName}>
      <img src={logoSrc} alt={alt} className={className} />
    </div>
  );
}

const navButton =
  "inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 shadow-sm transition-colors duration-150 hover:bg-slate-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-300 sm:text-xs";

export function PageNav({
  backHref,
  backLabel = "Volver",
  homeLabel = "Inicio",
  className = "",
}) {
  return (
    <div
      className={`flex w-full max-w-xl flex-wrap items-center gap-2 self-start text-left sm:max-w-2xl sm:flex-nowrap ${className}`}
    >
      {backHref ? (
        <Link to={backHref} className={navButton}>
          ← {backLabel}
        </Link>
      ) : null}
      <Link to="/" className={navButton}>
        ⌂ {homeLabel}
      </Link>
    </div>
  );
}
