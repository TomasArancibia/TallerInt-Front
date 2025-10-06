import axios from "axios";

// Lee primero VITE_API_BASE_URL; si no está, usa VITE_API_URL.
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.warn(
    "[api] Falta VITE_API_BASE_URL (o VITE_API_URL). " +
      "Configúrala en Vercel (Producción) y en .env.development (local)."
  );
}

export const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // activa solo si usas cookies
});

// Helpers de ejemplo (ajusta rutas a tu backend real)
export const getAreas = () => api.get("/areas");
export const postSolicitud = (payload: any) => api.post("/solicitudes", payload);
