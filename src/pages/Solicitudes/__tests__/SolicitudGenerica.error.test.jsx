import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import SolicitudGenerica from '../Shared/SolicitudGenerica.jsx'

beforeEach(() => {
  sessionStorage.setItem('id_cama', '999')
})

afterEach(() => {
  sessionStorage.clear()
  vi.resetAllMocks()
})

describe('SolicitudGenerica error flows', () => {
  it('shows validation errors if nombre/email missing', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SolicitudGenerica />} />
        </Routes>
      </MemoryRouter>
    )

    // submit without filling inputs - submit the form directly to avoid any native validation issues
    const continuarBtn = screen.getByRole('button', { name: /Continuar/i })
    const form = continuarBtn.closest('form')
    // ensure we have a form and submit it
    expect(form).toBeTruthy()
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText(/Escriba nombre y apellido/i)).toBeInTheDocument()
      expect(screen.getByText(/Escriba un correo electrónico/i)).toBeInTheDocument()
    })
  })

  it('shows fail result when POST /solicitudes returns not ok', async () => {
    // mock areas GET OK, then POST fail
    global.fetch = vi.fn((url, opts) => {
      if (typeof url === 'string' && url.endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([{ nombre: 'Area X' }]) })
      }
      if (typeof url === 'string' && url.endsWith('/solicitudes')) {
        return Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({ detail: 'Server error' }) })
      }
      return Promise.reject(new Error('unexpected ' + url))
    })

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SolicitudGenerica />} />
        </Routes>
      </MemoryRouter>
    )

    // fill contact
    await userEvent.type(screen.getByLabelText(/Nombre y Apellido/i), 'Ana')
    await userEvent.type(screen.getByLabelText(/Email/i), 'ana@correo.cl')
    await userEvent.click(screen.getByRole('button', { name: /Continuar/i }))

    // write message
    const textarea = await screen.findByLabelText(/Describe tu solicitud/i)
    await userEvent.type(textarea, 'Necesito ayuda')

    // click enviar
    await userEvent.click(screen.getByRole('button', { name: /Enviar solicitud/i }))

    // expect fail message
    expect(await screen.findByText(/Error al enviar la solicitud/i)).toBeInTheDocument()
  })
})
