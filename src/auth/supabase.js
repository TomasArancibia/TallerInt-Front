const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Configura estos valores en tu .env."
  );
}

const GOTRUE_URL = SUPABASE_URL ? `${SUPABASE_URL}/auth/v1` : "";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const status = response.status;
    const message = data.error_description || data.error || "Error al conectar con Supabase";
    const error = new Error(message);
    error.status = status;
    error.code = data.code;
    throw error;
  }
  return data;
}

export async function supabaseSignIn(email, password) {
  if (!GOTRUE_URL) {
    throw new Error("Supabase no está configurado.");
  }
  const response = await fetch(`${GOTRUE_URL}/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
}

export async function supabaseRefreshSession(refreshToken) {
  if (!GOTRUE_URL) {
    throw new Error("Supabase no está configurado.");
  }
  const response = await fetch(`${GOTRUE_URL}/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return handleResponse(response);
}

export async function supabaseSignOut(accessToken) {
  if (!GOTRUE_URL || !accessToken) {
    return;
  }
  await fetch(`${GOTRUE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch(() => {
    // Ignorar errores de logout (token puede haber expirado)
  });
}

export async function supabaseResetPasswordForEmail(email, redirectTo) {
  if (!GOTRUE_URL) {
    throw new Error("Supabase no está configurado.");
  }
  const body = { email };
  if (redirectTo) {
    body.redirect_to = redirectTo;
  }
  if (redirectTo) {
    body.options = { redirect_to: redirectTo };
  }
  const response = await fetch(`${GOTRUE_URL}/recover`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function supabaseUpdateUserPassword(accessToken, newPassword) {
  if (!GOTRUE_URL) {
    throw new Error("Supabase no está configurado.");
  }
  const response = await fetch(`${GOTRUE_URL}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password: newPassword }),
  });
  return handleResponse(response);
}
