import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(cors())

const port = process.env.PORT || 8000
const assistantId = process.env.OPENAI_ASSISTANT_ID

// Inicializa el cliente de OpenAI solo si existe API Key
let openai = null
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

// Endpoint principal de chat usando Assistants v2
app.post('/chat', async (req, res) => {
  try {
    if (!openai) {
      return res.status(500).json({ error: 'Falta OPENAI_API_KEY en el servidor' })
    }
    if (!assistantId) {
      return res.status(500).json({ error: 'Falta OPENAI_ASSISTANT_ID en el servidor' })
    }

    const { message } = req.body || {}
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Mensaje inválido' })
    }

    // Crea un hilo, agrega el mensaje del usuario, ejecuta el asistente y espera la respuesta
    const thread = await openai.beta.threads.create()

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    })

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    })

    // Polling simple hasta que el run termine
    let runStatus = run
    const startedAt = Date.now()
    while (
      runStatus.status !== 'completed' &&
      runStatus.status !== 'failed' &&
      runStatus.status !== 'cancelled' &&
      Date.now() - startedAt < 60000
    ) {
      await new Promise((r) => setTimeout(r, 800))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    if (runStatus.status !== 'completed') {
      return res.status(500).json({ error: `Run no completado: ${runStatus.status}` })
    }

    const list = await openai.beta.threads.messages.list(thread.id, { order: 'desc' })
    const assistantMsg = list.data.find((m) => m.role === 'assistant')

    let replyText = ''
    if (assistantMsg && assistantMsg.content && assistantMsg.content.length > 0) {
      // Extrae texto de los bloques (text annotations)
      const textBlocks = assistantMsg.content
        .filter((c) => c.type === 'text')
        .map((c) => c.text?.value)
        .filter(Boolean)
      replyText = textBlocks.join('\n').trim()
    }

    return res.json({ reply: replyText || '(Sin respuesta del asistente)' })
  } catch (err) {
    console.error('[chat] Error:', err)
    return res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

app.listen(port, () => {
  console.log(`[server] API escuchando en http://127.0.0.1:${port}`)
})


