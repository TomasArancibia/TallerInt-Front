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
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
      const data = await res.json()
      const reply = data?.reply ?? 'Lo siento, no pude obtener respuesta.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error al contactar el servidor.' },
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


