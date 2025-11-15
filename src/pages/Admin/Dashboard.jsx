import React, { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAdminAuth } from "../../auth/AdminAuthContext.jsx";

const API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production"
    ? "https://tallerintegracion-back.onrender.com"
    : "http://127.0.0.1:8000");

const CATEGORY_LABELS = {
  asistente_virtual: "Chatbot",
  info: "Info General",
  info_procesos_clinicos: "Info Procesos Clínicos",
  info_administrativa: "Info Administrativa",
  info_visitas: "Info Visitas",
};
const CATEGORY_ORDER = ["asistente_virtual", "info", "info_procesos_clinicos", "info_administrativa", "info_visitas"];
const DASHBOARD_TABS = [
  { key: "solicitudes", label: "Métricas de solicitudes" },
  { key: "sesiones", label: "Métricas de sesiones QR" },
  { key: "chatbot", label: "Métricas del chatbot" },
];

export default function Dashboard() {
  const [hospitales, setHospitales] = useState([]);
  const [areas, setAreas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  // Popup pendientes hoy
  const [showPendientesPopup, setShowPendientesPopup] = useState(false);
  const [pendientesHoyCount, setPendientesHoyCount] = useState(0);

  // Rango por defecto: últimos 7 días
  const today = new Date();
  const start7 = new Date(today);
  start7.setDate(today.getDate() - 6);
  const pad2 = (n) => String(n).padStart(2, "0");
  const toYMD = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; // anclado a local
  // helper: convierte fecha a YYYY-MM-DD en America/Santiago
  const toYMD_CL = (dateLike) => {
    try {
      const d = new Date(dateLike);
      const localCL = new Date(d.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
      return toYMD(localCL);
    } catch {
      return toYMD(new Date(dateLike));
    }
  };
  const [fechaInicio, setFechaInicio] = useState(toYMD(start7));
  const [fechaFin, setFechaFin] = useState(toYMD(today));
  const [rangeOpen, setRangeOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [tmpStart, setTmpStart] = useState(toYMD(start7));
  const [tmpEnd, setTmpEnd] = useState(toYMD(today));

  // Métricas
  const [metricasArea, setMetricasArea] = useState([]);
  const [metricasHospitalEstado, setMetricasHospitalEstado] = useState([]);
  const [metricasAreaDia, setMetricasAreaDia] = useState([]);
  const [promArea, setPromArea] = useState([]);
  const [promHospital, setPromHospital] = useState([]);
  const [portalSecciones, setPortalSecciones] = useState([]);
  const [portalCamas, setPortalCamas] = useState([]);
  const [portalSesionesDia, setPortalSesionesDia] = useState([]);
  const [portalSesionesResumen, setPortalSesionesResumen] = useState(null);
  const [portalChatKeywords, setPortalChatKeywords] = useState([]);
  const [portalChatTopics, setPortalChatTopics] = useState([]);
  const [portalChatBigrams, setPortalChatBigrams] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("__all__");
  const [dashboardView, setDashboardView] = useState("solicitudes");
  const { getAccessToken, signOut } = useAdminAuth();

  useEffect(() => {
    let active = true;
    async function fetchData() {
      setStatus("loading");
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada. Vuelva a iniciar sesión.");

        const response = await fetch(`${API}/admin/bootstrap`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) { await signOut(); return; }
        if (!response.ok) throw new Error("No se pudo cargar la información del dashboard.");

        const data = await response.json();
        if (!active) return;
        setUsuario(data.usuario || null);
        setHospitales(data.hospitales || []);
        setAreas(data.areas || []);
        setStatus("ok");
        // calcular pendientes de hoy
        try {
          const hoyCL = toYMD_CL(new Date());
          const solicitudes = Array.isArray(data.solicitudes) ? data.solicitudes : [];
          const countHoyPend = solicitudes.filter((s) => {
            if (!s || s.estado !== 'pendiente' || !s.fecha_creacion) return false;
            const dStr = toYMD_CL(new Date(s.fecha_creacion));
            return dStr === hoyCL;
          }).length;
          setPendientesHoyCount(countHoyPend);
          // Mostrar solo una vez por login (por usuario)
          const userId = (data.usuario && (data.usuario.id || data.usuario.correo)) || 'anon';
          const sessionMarker = sessionStorage.getItem('admin-session-login-id') || 'unknown';
          const storageKey = `admin-dashboard-pendientes:${userId}:${sessionMarker}`;
          if (countHoyPend > 0 && !sessionStorage.getItem(storageKey)) {
            setShowPendientesPopup(true);
            sessionStorage.setItem(storageKey, '1');
          }
        } catch (e) {
          console.debug('popup pendientes: no critico', e);
        }
      } catch (err) {
        if (!active) return;
        setError(err.message);
        setStatus("error");
      }
    }
    fetchData();
    return () => { active = false; };
  }, [getAccessToken, signOut]);

  useEffect(() => {
    let active = true;
    async function fetchMetricas() {
      if (parseYMD(fechaFin) < parseYMD(fechaInicio)) { alert("Rango inválido"); return; }
      try {
        const token = await getAccessToken();
        if (!token) throw new Error("Sesión expirada. Vuelva a iniciar sesión.");
        const response = await fetch(`${API}/admin/metricas?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401 || response.status === 403) { await signOut(); return; }
        if (!response.ok) throw new Error("No se pudieron cargar las métricas.");
        const data = await response.json();
        if (!active) return;
        setMetricasArea(data.por_area || []);
        setMetricasHospitalEstado(data.por_hospital_estado || []);
        setMetricasAreaDia(data.por_area_dia || []);
        setPromArea(data.promedio_resolucion_area || []);
        setPromHospital(data.promedio_resolucion_hospital || []);
        const portal = data.portal_analytics || {};
        setPortalSecciones(portal.secciones_mas_visitadas || []);
        setPortalCamas(portal.camas_con_mas_sesiones || []);
        setPortalSesionesDia(portal.sesiones_por_dia || []);
        setPortalSesionesResumen(portal.sesiones_resumen || null);
        setPortalChatKeywords(portal.chat_keywords || []);
        setPortalChatTopics(portal.chat_topics || []);
        setPortalChatBigrams(portal.chat_bigrams || []);
      } catch (err) {
        if (!active) return;
        console.error("Error cargando métricas:", err);
      }
    }
    fetchMetricas();
    return () => { active = false; };
  }, [fechaFin, fechaInicio, getAccessToken, signOut]);

  useEffect(() => { setTmpStart(fechaInicio); setTmpEnd(fechaFin); }, [fechaInicio, fechaFin]);

  function normalizeCategoriaSlug(slug) {
    const trimmed = (slug || "").trim().toLowerCase();
    return trimmed ? trimmed : "otros";
  }
  function categoriaMatches(base, slug) {
    const normalized = normalizeCategoriaSlug(slug);
    if (base === "otros") return !normalized || normalized === "otros";
    if (base === "info") return normalized === "info";
    return normalized === base || normalized.startsWith(`${base}_`);
  }
function formatCategoriaLabel(slug) {
  if (!slug || slug === "otros") return "Otras secciones";
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return slug.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function colorForPercentage(value) {
  if (value >= 50) return "#059669"; // verde
  if (value >= 10) return "#f59e0b"; // amarillo
  return "#dc2626"; // rojo
}

  useEffect(() => {
    if (selectedCategoria === "__all__") return;
    const available = new Set();
    for (const sec of portalSecciones) {
      const normalized = normalizeCategoriaSlug(sec.categoria);
      for (const cat of CATEGORY_ORDER) {
        if (cat === "otros") continue;
        if (normalized === cat || normalized.startsWith(`${cat}_`)) {
          available.add(cat);
        }
      }
    }
    if (!available.has(selectedCategoria)) {
      setSelectedCategoria("__all__");
    }
  }, [portalSecciones, selectedCategoria]);

  const tableWrapper = "mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm";
  const fmtLong = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "long", year: "numeric" });
  const parseYMD = (s) => { const [y,m,d] = s.split("-").map(Number); return new Date(y,(m||1)-1,d||1); };

  // Todos los usuarios tienen vista de administrador
  const isAdmin = true;
  const jefeAreaId = null;

  function setPreset(preset) {
    const d = new Date();
    const copy = (x) => new Date(x.getTime());
    let a = copy(d), b = copy(d);
    setCustomMode(false);
    if (preset === "today") {
      // a = b = hoy
    } else if (preset === "yesterday") {
      a.setDate(a.getDate()-1); b.setDate(b.getDate()-1);
    } else if (preset === "last7") {
      a.setDate(a.getDate()-6);
    } else if (preset === "last30") {
      a.setDate(a.getDate()-29);
    } else if (preset === "thisMonth") {
      a = new Date(d.getFullYear(), d.getMonth(), 1);
      b = new Date(d.getFullYear(), d.getMonth()+1, 0);
    } else if (preset === "lastMonth") {
      a = new Date(d.getFullYear(), d.getMonth()-1, 1);
      b = new Date(d.getFullYear(), d.getMonth(), 0);
    } else if (preset === "custom") {
      setCustomMode(true);
      return;
    }
    setFechaInicio(toYMD(a)); setFechaFin(toYMD(b)); setRangeOpen(false);
  }

  function applyCustom() {
    if (parseYMD(tmpEnd) < parseYMD(tmpStart)) return alert("Rango inválido");
    setFechaInicio(tmpStart); setFechaFin(tmpEnd); setCustomMode(false); setRangeOpen(false);
  }

  const tarjetasArea = useMemo(() => {
    const lista = isAdmin ? areas : areas.filter(a => a.id_area === jefeAreaId);
    return lista.map(a => ({
      nombre_area: a.nombre,
      total_solicitudes: metricasArea.find(m => m.nombre_area === a.nombre)?.total_solicitudes || 0,
    }));
  }, [areas, metricasArea, isAdmin, jefeAreaId]);

  const tarjetasInstitucion = useMemo(() => {
    return hospitales.map(h => {
      const registros = metricasHospitalEstado.filter(m => m.nombre_hospital === h.nombre);
      const totalHospital = registros.reduce((sum, m) => sum + m.total_solicitudes, 0);
      return {
        nombre: h.nombre,
        total: totalHospital,
        pendientes: registros.find(m => m.estado === 'pendiente')?.total_solicitudes || 0,
        enProceso: registros.find(m => m.estado === 'en_proceso')?.total_solicitudes || 0,
        cerradas: registros.find(m => m.estado === 'cerrada')?.total_solicitudes || 0,
      };
    });
  }, [hospitales, metricasHospitalEstado]);

  // Gráfico: últimos 15 días desde la fecha fin (incluida)
  const chartDays = useMemo(() => {
    const start = parseYMD(fechaInicio);
    const end = parseYMD(fechaFin);
    // ventana: máximo 15 días hacia atrás desde fechaFin, pero no antes de fechaInicio
    const windowStart = new Date(end);
    windowStart.setDate(end.getDate() - 14);
    const first = windowStart > start ? windowStart : start;
    const days = [];
    const cur = new Date(first);
    while (cur <= end) {
      days.push(toYMD(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  }, [fechaInicio, fechaFin]);

  const areaNames = useMemo(() => (
    isAdmin ? areas.map(a => a.nombre) : areas.filter(a => a.id_area === jefeAreaId).map(a => a.nombre)
  ), [areas, isAdmin, jefeAreaId]);

  const datosAgrupados = useMemo(() => {
    const base = chartDays.map(d => {
      const row = { dia: d };
      for (const a of areaNames) row[a] = 0;
      return row;
    });
    const indexByDay = Object.fromEntries(base.map((r,i)=>[r.dia,i]));
    for (const m of metricasAreaDia) {
      const d = typeof m.dia === 'string' ? m.dia.slice(0,10) : toYMD(new Date(m.dia));
      const idx = indexByDay[d];
      if (idx === undefined) continue;
      if (!areaNames.includes(m.nombre_area)) continue;
      base[idx][m.nombre_area] = m.total_solicitudes || 0;
    }
    return base;
  }, [chartDays, areaNames, metricasAreaDia]);

  const categoriaOptions = useMemo(() => {
    const available = new Set();
    for (const sec of portalSecciones) {
      const normalized = normalizeCategoriaSlug(sec.categoria);
      for (const cat of CATEGORY_ORDER) {
        if (cat === "otros") continue;
        if (normalized === cat || normalized.startsWith(`${cat}_`)) {
          available.add(cat);
        }
      }
    }
    return CATEGORY_ORDER.filter((slug) => slug !== "otros" && available.has(slug)).map((slug) => ({
      slug,
      label: formatCategoriaLabel(slug),
    }));
  }, [portalSecciones]);

  const filteredSecciones = useMemo(() => {
    const base =
      selectedCategoria === "__all__"
        ? portalSecciones
        : portalSecciones.filter((sec) => categoriaMatches(selectedCategoria, sec.categoria));
    return base.slice(0, 10);
  }, [portalSecciones, selectedCategoria]);

  const topCamas = useMemo(() => portalCamas.slice(0, 10), [portalCamas]);
  const sesionesPorDiaData = useMemo(() => {
    if (!portalSesionesDia || portalSesionesDia.length === 0) return [];
    return portalSesionesDia
      .map((item) => ({
        dia: item.dia,
        total_sesiones: item.total_sesiones || 0,
      }))
      .sort((a, b) => (a.dia || "").localeCompare(b.dia || ""));
  }, [portalSesionesDia]);
  const sesionesPorDiaChartData = useMemo(() => {
    if (sesionesPorDiaData.length <= 15) return sesionesPorDiaData;
    return sesionesPorDiaData.slice(-15);
  }, [sesionesPorDiaData]);
  const sesionesPorDiaTieneDatos = useMemo(
    () => sesionesPorDiaData.some((item) => (item.total_sesiones || 0) > 0),
    [sesionesPorDiaData]
  );
  const sesionesResumen = useMemo(() => {
    if (!portalSesionesResumen) {
      return { total: 0, promedio: 0, dias: 0 };
    }
    return {
      total: portalSesionesResumen.total_sesiones || 0,
      promedio: portalSesionesResumen.promedio_diario || 0,
      dias: portalSesionesResumen.dias_medidos || 0,
    };
  }, [portalSesionesResumen]);
  const numberFormatter = useMemo(() => new Intl.NumberFormat("es-CL"), []);
  const topChatTopics = useMemo(() => portalChatTopics.slice(0, 10), [portalChatTopics]);
  const topChatBigrams = useMemo(() => portalChatBigrams.slice(0, 10), [portalChatBigrams]);
  const topChatKeywords = useMemo(() => portalChatKeywords.slice(0, 10), [portalChatKeywords]);

  return (
    <div className="flex flex-col gap-4">
      {showPendientesPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Solicitudes pendientes de hoy</h2>
            <p className="mt-3 text-slate-700">
              Hay <span className="font-bold">{pendientesHoyCount}</span> solicitudes realizadas hoy que aun estan pendientes.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={() => setShowPendientesPopup(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                onClick={() => { setShowPendientesPopup(false); window.location.hash = '#/solicitudes'; }}
                className="rounded-xl bg-[#3481E2] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2f73c9]"
              >
                Ver solicitudes
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="rounded-2xl bg-white px-6 py-4 text-slate-900 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-semibold">Dashboard</h1>

          <div className="relative ml-auto">
            <button
              onClick={() => setRangeOpen(v=>!v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              {`${fmtLong.format(parseYMD(fechaInicio))} - ${fmtLong.format(parseYMD(fechaFin))}`}
              <svg className="ml-auto h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
            </button>

            {rangeOpen && (
              <div className="absolute right-4 z-50 mt-2 w-72 overflow-hidden rounded-lg bg-white text-slate-800 shadow-lg ring-1 ring-slate-200">
                {!customMode ? (
                  <div className="py-1">
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("today")}>Hoy</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("yesterday")}>Ayer</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last7")}>Últimos 7 días</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("last30")}>Últimos 30 días</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("thisMonth")}>Este mes</button>
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("lastMonth")}>Mes anterior</button>
                    <div className="my-1 border-t border-slate-200" />
                    <button className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50" onClick={() => setPreset("custom")}>Rango personalizado...</button>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <input type="date" className="w-[9.5rem] rounded-md border border-slate-300 px-2 py-1 text-sm" value={tmpStart} onChange={(e) => setTmpStart(e.target.value)} />
                      <span className="text-sm text-slate-500">a</span>
                      <input type="date" className="w-[9.5rem] rounded-md border border-slate-300 px-2 py-1 text-sm" value={tmpEnd} onChange={(e) => setTmpEnd(e.target.value)} />
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button className="rounded-md px-3 py-1 text-sm text-slate-600 hover:bg-slate-50" onClick={() => setCustomMode(false)}>Volver</button>
                      <button className="rounded-md bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800" onClick={applyCustom}>Aplicar</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {DASHBOARD_TABS.map((tab) => {
          const isActive = dashboardView === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setDashboardView(tab.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {status === "loading" && <p className="text-sm text-slate-600">Cargando datos...</p>}
      {status === "error" && <p className="text-sm font-semibold text-red-600">Error: {error}</p>}
      {status === "ok" && (
        <>
          {dashboardView === "solicitudes" && (
            <section className="mt-6 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Métricas</h2>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Área</h3>
              <div className="mt-4 flex flex-wrap gap-5">
                {tarjetasArea.map((m) => (
                  <div key={m.nombre_area} className="w-full flex-1 min-w-[220px] rounded-2xl bg-white px-6 py-5 text-center shadow-md ring-1 ring-slate-200">
                    <h4 className="text-base font-semibold text-slate-700">{m.nombre_area}</h4>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{m.total_solicitudes}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Institución</h3>
              <p className="mt-2 text-sm text-slate-500">
                Total general: {metricasHospitalEstado.reduce((sum, m) => sum + m.total_solicitudes, 0)}
              </p>

              <div className="mt-4 flex flex-wrap gap-6">
                {tarjetasInstitucion.map((t) => {
                  const porcentaje = t.total > 0 ? Math.round((t.cerradas / t.total) * 100) : 0;
                  const radius = 15.915;
                  const ringColor = porcentaje >= 66 ? '#10b981' : (porcentaje >= 33 ? '#eab308' : '#ef4444');
                  return (
                    <div key={t.nombre} className="w-full min-w-[260px] flex-1 rounded-2xl bg-white px-6 py-6 text-center shadow-md ring-1 ring-slate-200">
                      <h4 className="text-base font-semibold text-slate-700">{t.nombre}</h4>
                      <h2 className="mt-2 text-3xl font-bold text-slate-900">{t.total}</h2>
                      <div className="mx-auto my-4 h-24 w-24">
                        <svg viewBox="0 0 36 36" className="h-full w-full">
                          <circle cx="18" cy="18" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="4" />
                          <circle
                            cx="18" cy="18" r={radius} fill="none"
                            stroke={ringColor}
                            strokeWidth="4"
                            strokeDasharray={`${porcentaje}, 100`}
                            strokeLinecap="round"
                            transform="rotate(-90 18 18)"
                          />
                          <text x="18" y="20.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
                            {porcentaje}%
                          </text>
                        </svg>
                      </div>
                      <div className="flex justify-around text-sm">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-red-600">{t.pendientes}</span>
                          <span className="font-medium text-red-600">Pendientes</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold" style={{color:'#eab308'}}>{t.enProceso}</span>
                          <span className="font-medium" style={{color:'#eab308'}}>En Proceso</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg font-bold text-emerald-600">{t.cerradas}</span>
                          <span className="font-medium text-emerald-600">Cerradas</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Tiempo promedio de resolución (cerradas)</h3>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h4 className="mb-3 text-base font-semibold text-slate-700">Por Área</h4>
                  <div className={tableWrapper}>
                    <table className="min-w-full border-collapse text-left text-sm text-slate-700">
                      <thead>
                        <tr>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Área</th>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Horas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {areas.map(a => {
                          const found = promArea.find(p => p.nombre_area === a.nombre);
                          const horas = found ? found.horas : 0;
                          return (
                            <tr key={a.nombre}>
                              <td className="border border-slate-200 px-4 py-2">{a.nombre}</td>
                              <td className="border border-slate-200 px-4 py-2">{horas.toFixed(1)} h</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                }

                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <h4 className="mb-3 text-base font-semibold text-slate-700">Por Institución</h4>
                  <div className={tableWrapper}>
                    <table className="min-w-full border-collapse text-left text-sm text-slate-700">
                      <thead>
                        <tr>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Institución</th>
                          <th className="border border-slate-200 bg-slate-50 px-4 py-2 font-semibold">Horas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hospitales.map(h => {
                          const found = promHospital.find(p => p.nombre_hospital === h.nombre);
                          const horas = found ? found.horas : 0;
                          return (
                            <tr key={h.nombre}>
                              <td className="border border-slate-200 px-4 py-2">{h.nombre}</td>
                              <td className="border border-slate-200 px-4 py-2">{horas.toFixed(1)} h</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">Totales por Área y Día (últimos 15 días)</h3>
              <div className="mt-4 h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-2 py-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosAgrupados} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {[...new Set(areaNames)].map((area, index) => (
                      <Bar key={area} dataKey={area} name={area} stackId="a" fill={["#27ae60", "#e67e22", "#3498db", "#9b59b6", "#f1c40f"][index % 5]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            </section>
          )}

          {dashboardView === "sesiones" && (
            <section className="mt-6 flex flex-col gap-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Sesiones registradas</h3>
                <p className="mt-1 text-xs text-slate-500">Estas cifras muestran el total y el promedio de ingresos QR en el rango elegido.</p>
                <div className="mt-4 grid gap-6 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm flex flex-col items-center justify-center min-h-[220px]">
                    <p className="text-sm text-slate-500">Sesiones únicas</p>
                    <p className="mt-2 text-4xl font-bold text-slate-900">{numberFormatter.format(sesionesResumen.total)}</p>
                    <p className="mt-5 text-sm text-slate-500">Promedio diario</p>
                    <p className="text-3xl font-semibold text-indigo-600">{sesionesResumen.promedio.toFixed(1)}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      Basado en {sesionesResumen.dias || Math.max(1, sesionesPorDiaData.length)} día(s)
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold text-slate-800">Sesiones diarias (últimos 15 días máx.)</h4>
                      <span className="text-xs text-slate-500">{fechaInicio} – {fechaFin}</span>
                    </div>
                    {!sesionesPorDiaTieneDatos ? (
                      <p className="mt-4 text-sm text-slate-500">Sin registros de sesiones para este rango de fechas.</p>
                    ) : (
                      <div className="mt-4 h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={sesionesPorDiaChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dia" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="total_sesiones" name="Sesiones" fill="#2563eb" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800">Uso del portal QR</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Consolidado de clics e ingresos dentro del rango seleccionado. Cada % indica qué proporción de sesiones únicas
                  accedió al botón durante su visita.
                </p>
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-base font-semibold text-slate-800">Secciones más visitadas</h4>
                      {categoriaOptions.length > 1 && (
                        <select
                          className="ml-auto min-w-[160px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
                          value={selectedCategoria}
                          onChange={(e) => setSelectedCategoria(e.target.value)}
                        >
                          <option value="__all__">Todas las categorías</option>
                          {categoriaOptions.map((opt) => (
                            <option key={opt.slug} value={opt.slug}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    {portalSecciones.length === 0 ? (
                      <p className="mt-4 text-sm text-slate-500">Sin registros en el periodo.</p>
                    ) : filteredSecciones.length === 0 ? (
                      <p className="mt-4 text-sm text-slate-500">No hay datos para esta categoría.</p>
                    ) : (
                      <>
                        <ul className="mt-4 space-y-3">
                          {filteredSecciones.map((sec) => (
                            <li key={`${sec.seccion}-${sec.label || "label"}`}>
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-slate-800">{sec.label || sec.seccion}</p>
                                  <p className="text-xs text-slate-500">
                                    {sec.categoria ? formatCategoriaLabel(normalizeCategoriaSlug(sec.categoria)) : "Sin categoría"}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-slate-900">{sec.total_clicks}</p>
                                  {(() => {
                                    const pct = sec.porcentaje || 0;
                                    const color = colorForPercentage(pct);
                                    return <p className="text-base font-bold" style={{ color }}>{pct.toFixed(1)}%</p>;
                                  })()}
                                </div>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-slate-100">
                                <div
                                  className="h-2 rounded-full bg-indigo-500"
                                  style={{
                                    width: `${Math.min(100, sec.porcentaje || 0)}%`,
                                    backgroundColor: colorForPercentage(sec.porcentaje || 0),
                                  }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-[11px] text-slate-400">
                          Los porcentajes indican qué fracción de las sesiones únicas abrió cada botón en el rango seleccionado.
                        </p>
                      </>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800">Camas con más sesiones</h4>
                    {topCamas.length === 0 ? (
                      <p className="mt-4 text-sm text-slate-500">Sin actividad registrada.</p>
                    ) : (
                      <ul className="mt-4 space-y-3">
                        {topCamas.map((cama, index) => {
                          const habitacionLabel = cama.habitacion ? `Hab. ${cama.habitacion}` : "Habitacion N/D";
                          const camaLabel = `Cama ${cama.cama || cama.id_cama}`;
                          const hospitalLabel = cama.institucion || cama.hospital || cama.nombre_hospital || cama.hospital_nombre || "";
                          const servicioLabel =
                            cama.servicio ||
                            cama.nombre_servicio ||
                            cama.servicio_nombre ||
                            cama.servicioNombre ||
                            cama.nombreServicio ||
                            "";
                          return (
                            <li key={`${cama.id_cama}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 px-3 py-2">
                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  #{index + 1} {habitacionLabel} - {camaLabel}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {hospitalLabel || "Hospital N/D"}
                                  {servicioLabel ? ` - ${servicioLabel}` : " - Servicio N/D"}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-extrabold text-slate-900">{cama.total_sesiones}</p>
                                <p className="text-[13px] font-semibold text-slate-500">Ingresos desde QR</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {dashboardView === "chatbot" && (
            <section className="mt-6 flex flex-col gap-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-semibold text-slate-800">Uso del chatbot</h4>
                    <p className="text-xs text-slate-500">Qué temas, frases y palabras se repiten en las conversaciones.</p>
                  </div>
                  <div className="flex gap-6 text-sm text-slate-600">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Temas distintos</p>
                      <p className="text-xl font-semibold text-slate-900">{topChatTopics.length}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Frases detectadas</p>
                      <p className="text-xl font-semibold text-slate-900">{topChatBigrams.length}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">Palabras clave</p>
                      <p className="text-xl font-semibold text-slate-900">{topChatKeywords.length}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 p-4">
                    <h5 className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Temas recurrentes</h5>
                    {topChatTopics.length === 0 ? (
                      <p className="mt-2 text-sm text-slate-500">Sin datos para este rango.</p>
                    ) : (
                      <ul className="mt-3 space-y-2">
                        {topChatTopics.map((topic) => (
                          <li key={topic.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-3 py-2">
                            <div className="text-sm font-semibold text-slate-800">{topic.label}</div>
                            <div className="text-right text-xs text-slate-500">
                              <div className="text-lg font-bold text-slate-900">{topic.total}</div>
                              <div>{(topic.porcentaje || 0).toFixed(1)}%</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="rounded-xl border border-slate-100 p-4">
                    <h5 className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Frases & palabras destacadas</h5>
                    {topChatBigrams.length === 0 && topChatKeywords.length === 0 ? (
                      <p className="mt-2 text-sm text-slate-500">Sin registros para este rango.</p>
                    ) : (
                      <div className="mt-3 grid gap-4 lg:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-semibold uppercase text-slate-400">Frases</p>
                          <ul className="mt-2 space-y-2">
                            {topChatBigrams.slice(0, 6).map((bg, idx) => (
                              <li key={`${bg.frase}-${idx}`} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                                <div className="text-sm text-slate-800">{bg.frase}</div>
                                <div className="text-right text-xs text-slate-500">
                                  <div className="font-semibold text-slate-900">{bg.total}</div>
                                  <div>{(bg.porcentaje || 0).toFixed(1)}%</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase text-slate-400">Palabras</p>
                          <ul className="mt-2 space-y-2">
                            {topChatKeywords.slice(0, 6).map((kw) => (
                              <li key={kw.keyword} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                                <div className="text-sm font-semibold capitalize text-slate-800">{kw.keyword}</div>
                                <div className="text-right text-xs text-slate-500">
                                  <div className="font-semibold text-slate-900">{kw.total}</div>
                                  <div>{(kw.porcentaje || 0).toFixed(1)}%</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
