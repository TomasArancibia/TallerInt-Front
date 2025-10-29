import React, { useEffect, useState } from "react";
import {
  pageContainer,
  sectionStack,
  helperText,
  actionPurple,
} from "../../components/ui.jsx";
import { supabaseUpdateUserPassword, supabaseSignOut } from "../../auth/supabase.js";

function parseHashParams() {
  if (typeof window === "undefined") return {};
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : window.location.hash;
  const params = new URLSearchParams(hash);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");
  const type = params.get("type");
  return { accessToken, refreshToken, type };
}

export default function ResetPassword() {
  const [{ accessToken, type }, setTokens] = useState({ accessToken: null, type: null });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const { accessToken: token, type: linkType } = parseHashParams();
    setTokens({ accessToken: token, type: linkType });
    if (token) {
      // limpiar hash para evitar re-ejecuciones accidentales
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/reset-password`);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!accessToken || type !== "recovery") {
      setError("El enlace de recuperación no es válido o expiró.");
      return;
    }

    if (!password || password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setStatus("loading");
    try {
      await supabaseUpdateUserPassword(accessToken, password);
      setPassword("");
      setConfirm("");
      // invalidar token
      await supabaseSignOut(accessToken);
      setSuccess("Contraseña actualizada correctamente. Ahora puedes iniciar sesión desde la pantalla principal.");
    } catch (err) {
      setError(err.message || "No pudimos actualizar la contraseña.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className={pageContainer}>
      <section className={`${sectionStack} max-w-md`}>
        <div className={`${actionPurple} pointer-events-none uppercase`}>Restablecer contraseña</div>
        <p className={helperText}>
          Ingresa y confirma tu nueva contraseña para completar el proceso de recuperación.
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-purple-200 bg-white px-6 py-6 text-left shadow-sm"
        >
          {!accessToken || type !== "recovery" ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              El enlace de recuperación no es válido o expiró. Solicita uno nuevo desde la pantalla de inicio de sesión.
            </p>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                    Nueva contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700" htmlFor="confirm">
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    className="mt-1 w-full rounded-xl border-2 border-purple-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error ? (
                <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`${actionPurple} mt-5 w-full px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {status === "loading" ? "Actualizando…" : "Actualizar contraseña"}
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
