import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { PageNav } from "../components/ui.jsx";

function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hola, soy tu asistente. ¿En qué puedo ayudarte?" },
  ])
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendRawMessage(trimmed) {
    if (!trimmed || sending) return
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }])
    setSending(true)
    try {
      // Construir base API desde variables de entorno (Vite) o usar origin
      const BASE = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL ?? (typeof window !== 'undefined' ? window.location.origin : '')

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
      for (const url of candidates) {
        try {
          console.debug('[Chatbot] intentando', url)
          res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed }),
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
              <div className={`bubble ${m.role}`}>{m.content}</div>
            </div>
          ))}
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


