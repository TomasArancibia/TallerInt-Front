import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabaseRefreshSession, supabaseSignIn, supabaseSignOut } from "./supabase.js";

const STORAGE_KEY = "admin-auth-session";
const AdminAuthContext = createContext(null);

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

function loadStoredSession() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.access_token || !parsed.refresh_token) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function storeSession(session) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

async function fetchAdminProfile(accessToken) {
  const response = await fetch(`${API}/admin/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Perfil desactivado. Por favor, contacta al administrador.");
  }
  return response.json();
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => loadStoredSession());
  const [initializing, setInitializing] = useState(true);
  const refreshLock = useRef(null);

  const updateSession = useCallback((nextSession) => {
    setSession(nextSession);
    storeSession(nextSession);
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
    storeSession(null);
  }, []);

  const signIn = useCallback(async (email, password) => {
    const authData = await supabaseSignIn(email, password);
    const { access_token, refresh_token, expires_in } = authData;
    const expires_at = Math.floor(Date.now() / 1000) + expires_in;

    const profile = await fetchAdminProfile(access_token);

    const nextSession = {
      access_token,
      refresh_token,
      expires_at,
      usuario: profile.usuario,
    };
    updateSession(nextSession);
    return nextSession;
  }, [updateSession]);

  const signOut = useCallback(async () => {
    if (session?.access_token) {
      await supabaseSignOut(session.access_token);
    }
    clearSession();
  }, [clearSession, session]);

  const refreshIfNeeded = useCallback(async () => {
    if (!session) return null;
    const now = Math.floor(Date.now() / 1000);
    if (session.expires_at && session.expires_at - 30 > now) {
      return session;
    }

    if (refreshLock.current) {
      return refreshLock.current;
    }

    const refreshPromise = supabaseRefreshSession(session.refresh_token)
      .then(async (data) => {
        const { access_token, refresh_token, expires_in } = data;
        const expires_at = Math.floor(Date.now() / 1000) + expires_in;

        let usuario = session.usuario;
        try {
          const profile = await fetchAdminProfile(access_token);
          usuario = profile.usuario;
        } catch {
          // Si falla volveremos a requerir login
        }

        const nextSession = {
          access_token,
          refresh_token,
          expires_at,
          usuario,
        };
        updateSession(nextSession);
        return nextSession;
      })
      .catch((error) => {
        console.error("[auth] Error al refrescar sesión:", error);
        clearSession();
        return null;
      })
      .finally(() => {
        refreshLock.current = null;
      });

    refreshLock.current = refreshPromise;
    return refreshPromise;
  }, [clearSession, session, updateSession]);

  const getAccessToken = useCallback(async () => {
    const current = await refreshIfNeeded();
    return current?.access_token ?? null;
  }, [refreshIfNeeded]);

  const refreshProfile = useCallback(async () => {
    const current = await refreshIfNeeded();
    if (!current || !current.access_token) {
      throw new Error("Sesión expirada, vuelva a iniciar sesión.");
    }
    const profile = await fetchAdminProfile(current.access_token);
    const nextSession = {
      ...current,
      usuario: profile.usuario,
    };
    updateSession(nextSession);
    return profile.usuario;
  }, [refreshIfNeeded, updateSession]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!session) {
        setInitializing(false);
        return;
      }
      const refreshed = await refreshIfNeeded();
      if (active) {
        if (!refreshed) {
          clearSession();
        }
        setInitializing(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [clearSession, refreshIfNeeded, session]);

  const value = useMemo(
    () => ({
      session,
      initializing,
      signIn,
      signOut,
      getAccessToken,
      usuario: session?.usuario ?? null,
      refreshProfile,
    }),
    [getAccessToken, initializing, refreshProfile, session, signIn, signOut],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth debe usarse dentro de AdminAuthProvider");
  }
  return ctx;
}
