import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

import Chatbot from '../Chatbot.jsx'

beforeEach(() => {
  vi.resetAllMocks()
  sessionStorage.removeItem('chat_seed_message')
})

describe('Chatbot flows', () => {
  it('sends a message and shows assistant reply', async () => {
    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/api/chat')) {
        return Promise.resolve({ ok: true, json: async () => ({ reply: 'Respuesta de prueba' }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(
      <MemoryRouter>
        <Chatbot />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Escribe tu mensaje/i)
    await userEvent.type(input, 'Hola prueba')
    const enviar = screen.getByRole('button', { name: /Enviar|Enviando/i })
    await userEvent.click(enviar)

    // wait for assistant reply
    expect(await screen.findByText('Respuesta de prueba')).toBeInTheDocument()
  })

  it('auto-sends seed message from sessionStorage on load', async () => {
    sessionStorage.setItem('chat_seed_message', 'Pregunta sembrada')

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/api/chat')) {
        return Promise.resolve({ ok: true, json: async () => ({ reply: 'Reply to seed' }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(
      <MemoryRouter>
        <Chatbot />
      </MemoryRouter>
    )

    // seed should be removed and reply shown
    await waitFor(() => expect(sessionStorage.getItem('chat_seed_message')).toBeNull())
    expect(await screen.findByText('Reply to seed')).toBeInTheDocument()
  })
})
