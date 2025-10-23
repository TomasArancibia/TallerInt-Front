import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";
import { Logo, pageContainer, sectionStack, actionPurple, helperText } from "../../components/ui.jsx";
import { supabaseResetPasswordForEmail } from "../../auth/supabase.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [resetting, setResetting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      await signIn(email.trim(), password);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.code === "invalid_grant" || err.status === 400) {
        setError("Correo o contraseña inválidos");
      } else {
        setError(err.message || "Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      setError("Ingresa tu correo institucional para recuperar la contraseña");
      return;
    }
    setError(null);
    setInfo(null);
    setResetting(true);
    try {
      const redirectTo = `${window.location.origin}/admin.html#/reset-password`;
      await supabaseResetPasswordForEmail(email.trim(), redirectTo);
      setInfo("Te enviamos un correo con instrucciones para recuperar tu contraseña.");
    } catch (err) {
      if (err.status === 400 && err.message.toLowerCase().includes("rate limit")) {
        setError("Hemos enviado recientemente un correo a esta dirección. Intenta más tarde.");
      } else {
        setError(err.message || "No pudimos enviar el correo de recuperación");
      }
    } finally {
      setResetting(false);
    }
  };

  return (
    <main className={`${pageContainer} justify-center`}>
      <Logo />
      <section className={`${sectionStack} max-w-md`}>
        <div className={`${actionPurple} pointer-events-none uppercase`}>
          Acceso Administrador
        </div>
        <p className={helperText}>
          Ingrese sus credenciales institucionales para acceder al panel de administración.
        </p>

        <form
          className="w-full rounded-2xl border border-purple-200 bg-white px-6 py-6 text-left shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="usuario@uc.cl"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
          </div>

          {error ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600">
              {info}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className={`${actionPurple} mt-5 w-full px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={resetting}
            className="mt-3 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {resetting ? "Enviando…" : "Olvidé mi contraseña"}
          </button>
        </form>
      </section>
    </main>
  );
}
