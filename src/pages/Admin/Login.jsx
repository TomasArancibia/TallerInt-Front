import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";
import { Logo, pageContainer, sectionStack, actionPurple, helperText } from "../../components/ui.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email.trim(), password);
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
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

          <button
            type="submit"
            disabled={loading}
            className={`${actionPurple} mt-5 w-full px-6 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </section>
    </main>
  );
}
