const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
export const PORTAL_SESSION_KEY = "portal_session_id";

function sanitizeUrl(base) {
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

const API_BASE_URL = sanitizeUrl(rawApiBaseUrl);

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export function ensurePortalSessionId() {
  if (typeof window === "undefined") return null;
  const existing = sessionStorage.getItem(PORTAL_SESSION_KEY);
  if (existing) {
    return existing;
  }
  const newId =
    (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  sessionStorage.setItem(PORTAL_SESSION_KEY, newId);
  return newId;
}

export function getPortalTrackingContext() {
  if (typeof window === "undefined") return null;
  const idCamaRaw = sessionStorage.getItem("id_cama");
  const qrCode = sessionStorage.getItem("qr_code");
  const portalSessionId = sessionStorage.getItem(PORTAL_SESSION_KEY) || ensurePortalSessionId();
  const idCama = idCamaRaw ? Number(idCamaRaw) : null;
  return {
    id_cama: Number.isNaN(idCama) ? null : idCama,
    qr_code: qrCode || null,
    portal_session_id: portalSessionId,
  };
}

export function trackPortalButtonClick({
  buttonCode,
  buttonLabel,
  categoria,
  sourcePath,
  targetPath,
  idCama,
  qrCode,
  portalSessionId,
  payload,
} = {}) {
  if (typeof window === "undefined" || !buttonCode) return;

  const context = getPortalTrackingContext();
  const body = {
    button_code: buttonCode,
    button_label: buttonLabel || null,
    categoria: categoria || null,
    source_path: sourcePath || window.location.pathname,
    target_path: targetPath || null,
    id_cama: typeof idCama === "number" ? idCama : context?.id_cama ?? null,
    qr_code: qrCode ?? context?.qr_code ?? null,
    portal_session_id: portalSessionId ?? context?.portal_session_id ?? ensurePortalSessionId(),
    payload: payload || null,
  };

  const endpoint = `${API_BASE_URL}/analytics/button-click`;
  const data = JSON.stringify(body);

  if (navigator?.sendBeacon) {
    const blob = new Blob([data], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return;
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
    keepalive: true,
  }).catch(() => {
    // Silenciamos errores para no romper la navegación del usuario.
  });
}
