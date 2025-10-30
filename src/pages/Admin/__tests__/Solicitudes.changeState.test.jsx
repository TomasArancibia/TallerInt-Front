import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({ getAccessToken: async () => 'TOKEN', signOut: async () => {} }),
}))

import Solicitudes from '../Solicitudes.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

afterEach(() => {
  vi.resetAllMocks()
})

describe('Solicitudes change state', () => {
  it('calls PUT when JEFE_AREA changes estado', async () => {
    const sample = {
      usuario: { rol: 'JEFE_AREA', id_area: 1 },
      areas: [{ id_area: 1, nombre: 'Area1' }],
      hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [],
      solicitudes: [{ id: 7, id_area:1, id_cama: 10, nombre_solicitante: 'X', estado: 'pendiente', fecha_creacion: new Date().toISOString() }]
    }

    // bootstrap response then PUT - use URL-aware mock to avoid broken mocks when extra fetches occur
    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => sample })
      }
      if (opts && opts.method === 'PUT') {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({ solicitud: { id:7, estado: 'en_proceso' } }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(
      <MemoryRouter>
        <Solicitudes />
      </MemoryRouter>
    )

    // wait for bootstrap
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // find the select for estado
    const select = await screen.findByDisplayValue(/pendiente/i)
    expect(select).toBeInTheDocument()

    // change value
    await userEvent.selectOptions(select, 'en_proceso')

    // expect a PUT call to solicitudes/{id}/estado
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(`/solicitudes/7/estado`), expect.objectContaining({ method: 'PUT' }))
    })
  })
})
