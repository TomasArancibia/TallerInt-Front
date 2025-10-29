import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import SolicitudMantencion from '../SolicitudMantencion.jsx'

beforeEach(() => {
  sessionStorage.setItem('id_cama', '55')
})

afterEach(() => {
  sessionStorage.clear()
  vi.resetAllMocks()
})

describe('SolicitudMantencion deep tests', () => {
  it('handles POST success and shows success message', async () => {
    // areas GET
    global.fetch = vi.fn((url, opts) => {
      if (typeof url === 'string' && url.endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([{ nombre: 'Manten' }]) })
      }
      if (typeof url === 'string' && url.endsWith('/solicitudes')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) })
      }
      return Promise.reject(new Error('unexpected ' + url))
    })

    render(
      <MemoryRouter initialEntries={["/solicitudmantencion"]}>
        <Routes>
          <Route path="/solicitudmantencion" element={<SolicitudMantencion />} />
        </Routes>
      </MemoryRouter>
    )

    // fill contact
    await userEvent.type(screen.getByLabelText(/Nombre y Apellido/i), 'Carlos')
    await userEvent.type(screen.getByLabelText(/Email/i), 'carlos@correo.cl')
    await userEvent.click(screen.getByRole('button', { name: /Continuar/i }))

    const textarea = await screen.findByLabelText(/Describe tu solicitud/i)
    await userEvent.type(textarea, 'Arreglar luz')
    await userEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }))

    expect(await screen.findByText(/Solicitud enviada correctamente/i)).toBeInTheDocument()
  })

  it('handles POST failure and shows fail message', async () => {
    global.fetch = vi.fn((url, opts) => {
      if (typeof url === 'string' && url.endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      }
      if (typeof url === 'string' && url.endsWith('/solicitudes')) {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({ detail: 'no' }) })
      }
      return Promise.reject(new Error('unexpected ' + url))
    })

    render(
      <MemoryRouter initialEntries={["/solicitudmantencion"]}>
        <Routes>
          <Route path="/solicitudmantencion" element={<SolicitudMantencion />} />
        </Routes>
      </MemoryRouter>
    )

    await userEvent.type(screen.getByLabelText(/Nombre y Apellido/i), 'Pedro')
    await userEvent.type(screen.getByLabelText(/Email/i), 'pedro@correo.cl')
    await userEvent.click(screen.getByRole('button', { name: /Continuar/i }))
    const textarea = await screen.findByLabelText(/Describe tu solicitud/i)
    await userEvent.type(textarea, 'Algo no funciona')
    await userEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }))

    expect(await screen.findByText(/Error al enviar la solicitud/i)).toBeInTheDocument()
  })
})
