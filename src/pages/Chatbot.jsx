import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { PageNav } from "../components/ui.jsx";
import {
  getPortalTrackingContext,
  ensurePortalSessionId,
  getApiBaseUrl,
} from "../utils/portalTracking";

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola, soy tu asistente. ¿En qué puedo ayudarte?" },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  function renderMessageContent(raw) {
    const base = (raw || '')
      // borra sufijos tipo [+source] o similares
      .replace(/\s*\[[^\]]*source[^\]]*\]\s*$/gi, '')
      .trim();

    const mdRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gi;
    const plainUrlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

    const pieces = [];
    let lastMdIndex = 0;
    let mdMatch;

    const pushPlainWithLinks = (text) => {
      let lastIndex = 0;
      let match;
      while ((match = plainUrlRegex.exec(text)) !== null) {
        const start = match.index;
        if (start > lastIndex) pieces.push(text.slice(lastIndex, start));
        const urlText = match[0];
        const href = urlText.startsWith('http') ? urlText : `https://${urlText}`;
        pieces.push(
          <a key={`plain-${pieces.length}-${start}`} href={href} target="_blank" rel="noopener noreferrer" className="chat-link">
            {urlText}
          </a>
        );
        lastIndex = plainUrlRegex.lastIndex;
      }
      if (lastIndex < text.length) pieces.push(text.slice(lastIndex));
    };

    while ((mdMatch = mdRegex.exec(base)) !== null) {
      const start = mdMatch.index;
      if (start > lastMdIndex) {
        pushPlainWithLinks(base.slice(lastMdIndex, start));
      }
      const label = mdMatch[1];
      const href = mdMatch[2];
      pieces.push(
        <a key={`md-${pieces.length}-${start}`} href={href} target="_blank" rel="noopener noreferrer" className="chat-link">
          {label}
        </a>
      );
      lastMdIndex = mdRegex.lastIndex;
    }

    if (lastMdIndex < base.length) {
      pushPlainWithLinks(base.slice(lastMdIndex));
    }

    if (pieces.length === 0) return base;
    return pieces.map((p, idx) => (typeof p === 'string' ? <span key={`txt-${idx}`}>{p}</span> : p));
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendRawMessage(trimmed) {
    if (!trimmed || sending) return
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setSending(true)
    try {
      // Construir base API desde variables de entorno (Vite) o usar origin
      const BASE = getApiBaseUrl() || (typeof window !== 'undefined' ? window.location.origin : '')

      // Candidate endpoints (probamos en orden hasta obtener respuesta OK)
      const candidates = []
      if (BASE) {
        const baseClean = BASE.replace(/\/+$/, '')
        candidates.push(`${baseClean}/chat`)
        candidates.push(`${baseClean}/api/chat`)
      }
      // paths relativos (útiles en dev cuando frontend y backend corren same origin or proxy)
      candidates.push('/chat')
      candidates.push('/api/chat')

      let lastErr = null
      let res = null
      const tracking = getPortalTrackingContext() ?? {}
      const sessionId = tracking.portal_session_id ?? ensurePortalSessionId()
      for (const url of candidates) {
        try {
          console.debug('[Chatbot] intentando', url)
          res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: trimmed,
              id_cama: typeof tracking.id_cama === 'number' ? tracking.id_cama : null,
              qr_code: tracking.qr_code ?? null,
              portal_session_id: sessionId ?? null,
            }),
          })
          console.debug('[Chatbot] status', res.status, 'from', url)
          if (!res.ok) {
            // intentamos siguiente candidato
            const text = await res.text().catch(() => res.statusText || '')
            lastErr = new Error(`HTTP ${res.status} - ${text}`)
            continue
          }
          // si OK, rompemos el loop
          break
        } catch (e) {
          console.warn('[Chatbot] error fetch', e, 'url', url)
          lastErr = e
          // intentar siguiente candidato
        }
      }

      if (!res) {
        throw lastErr ?? new Error('No se pudo conectar a la API')
      }

      // parsear JSON con control
      let data = null
      try {
        data = await res.json()
      } catch (e) {
        console.warn('[Chatbot] no se pudo parsear JSON', e)
      }

      const reply = (data && (data.reply || data.message)) ?? 'Lo siento, no pude obtener respuesta.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('[Chatbot] fallo final', err)
      const msg = err && err.message ? `Error al contactar el servidor: ${err.message}` : 'Error al contactar el servidor.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: msg },
      ])
    } finally {
      setSending(false)
    }
  }

  async function sendMessage(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setInput("")
    await sendRawMessage(trimmed)
  }

  // Al cargar, si hay una pregunta sembrada desde Homepage, la enviamos automáticamente
  useEffect(() => {
    const seed = typeof window !== 'undefined' ? sessionStorage.getItem('chat_seed_message') : null
    if (seed) {
      sessionStorage.removeItem('chat_seed_message')
      const trimmed = seed.toString().trim()
      if (trimmed) {
        // no usamos setInput para evitar duplicación; enviamos directo
        sendRawMessage(trimmed)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="chat-wrapper">
      <PageNav homeLabel="Volver al inicio" />
      <div className="chat-card">
        <div className="chat-header">
          <h3 className="chat-title">Asistente</h3>
          <div className="chat-subtitle">UC Christus</div>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg-row ${m.role}`}>
              <div className={`bubble ${m.role}`}>{renderMessageContent(m.content)}</div>
            </div>
          ))}
          {sending && (
            <div className="msg-row assistant">
              <div className="bubble assistant typing-indicator">
                El asistente está escribiendo
                <span className="typing-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form className="chat-input" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            type="text"
          />
          <button type="submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
