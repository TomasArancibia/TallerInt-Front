// src/pages/Landing.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Homepage from "./Homepage.jsx";

const API = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function Landing() {
  const [params] = useSearchParams();
  const qr = params.get("qr");

  const [ctx, setCtx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!qr) return;
    setLoading(true);
    fetch(`${API}/qr/validate?code=${encodeURIComponent(qr)}`)
      .then(r => r.json())
      .then(data => {
        if (!data.ok) {
          setError(data.reason || "invalid_qr");
          setCtx(null);
          return;
        }
        setCtx(data);
        setError("");

        // Guardar para uso en otras páginas (solicitudes)
        sessionStorage.setItem("qr_code", data.code);
        sessionStorage.setItem("id_cama", String(data.id_cama));
      })
      .catch(() => setError("network_error"))
      .finally(() => setLoading(false));
  }, [qr]);

  if (!qr) return <main style={{ padding: 16 }}>QR no presente en la URL.</main>;
  if (loading) return <main style={{ padding: 16 }}>Validando QR…</main>;

  if (error === "inactive") {
    return <main style={{ padding: 16 }}>Este QR está inactivo. Avise al personal.</main>;
  }
  if (error === "not_found") {
    return <main style={{ padding: 16 }}>QR inválido. Avise al personal.</main>;
  }
  if (error) {
    return <main style={{ padding: 16 }}>Error al validar QR.</main>;
  }

  // Si está todo OK, renderizamos tu Homepage tal cual
  return <Homepage />;
}
