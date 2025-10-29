import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => {
  const adminCtx = { usuario: { rol: 'ADMIN' }, getAccessToken: async () => 'TOKEN' }
  return { useAdminAuth: () => adminCtx }
})

import Solicitudes from '../Solicitudes.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Solicitudes pagination', () => {
  it('shows 10 items per page and navigates pages', async () => {
    // create 25 sample solicitudes
    const now = new Date().toISOString()
    const solicitudes = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      id_area: 1,
      id_cama: 100 + i,
      nombre_solicitante: `User ${i + 1}`,
      fecha_creacion: now,
      estado: 'pendiente',
    }))

    const bootstrap = {
      usuario: { rol: 'ADMIN' },
      areas: [{ id_area: 1, nombre: 'Area 1' }],
      hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [],
      solicitudes,
    }

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => bootstrap })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Solicitudes />)

    // wait for load
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // page indicator should show 3 pages (25 items, 10 per page)
    expect(await screen.findByText(/Página 1 de 3/)).toBeInTheDocument()

    // should show first page item (id 1) and not show item id 11
    expect(await screen.findByText('1')).toBeInTheDocument()
    const notOnFirst = screen.queryByText('11')
    expect(notOnFirst).toBeNull()

    // click Siguiente
    const siguiente = screen.getByRole('button', { name: /Siguiente/i })
    await userEvent.click(siguiente)

    // now page 2 and item 11 should be visible
    expect(await screen.findByText(/Página 2 de 3/)).toBeInTheDocument()
    expect(await screen.findByText('11')).toBeInTheDocument()

    // click Siguiente again to page 3
    await userEvent.click(siguiente)
    expect(await screen.findByText(/Página 3 de 3/)).toBeInTheDocument()
    // last page should show id 25
    expect(await screen.findByText('25')).toBeInTheDocument()
  })
})
