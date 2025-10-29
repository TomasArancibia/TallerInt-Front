import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => {
  const adminCtx = { usuario: { rol: 'ADMIN' }, getAccessToken: async () => 'TOKEN' }
  return { useAdminAuth: () => adminCtx }
})

import Ubicaciones from '../Ubicaciones.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Ubicaciones page', () => {
  it('renders tables with bootstrap data', async () => {
    const now = new Date().toISOString()
    const data = {
      hospitales: [{ id_hospital: 1, nombre: 'H-Principal' }],
      edificios: [{ id_edificio: 10, nombre: 'E-1', id_hospital: 1 }],
      pisos: [{ id_piso: 100, numero: 2, id_edificio: 10 }],
      servicios: [{ id_servicio: 200, nombre: 'Servicio X' }],
      habitaciones: [{ id_habitacion: 300, nombre: 'Hab A', id_hospital: 1 }],
      camas: [{ id_cama: 400, qr: 'QR-400', id_habitacion: 300 }]
    }

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => data })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Ubicaciones />)

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // headings
    expect(await screen.findByText(/Hospitales/i)).toBeInTheDocument()
    expect(await screen.findByText(/Edificios/i)).toBeInTheDocument()
    expect(await screen.findByText(/Pisos/i)).toBeInTheDocument()
    expect(await screen.findByText(/Servicios/i)).toBeInTheDocument()
    expect(await screen.findByText(/Habitaciones/i)).toBeInTheDocument()
    expect(await screen.findByText(/Camas/i)).toBeInTheDocument()

    // data rows
    expect(await screen.findByText('H-Principal')).toBeInTheDocument()
    expect(await screen.findByText('E-1')).toBeInTheDocument()
    expect(await screen.findByText('2')).toBeInTheDocument()
    expect(await screen.findByText('Servicio X')).toBeInTheDocument()
    expect(await screen.findByText('Hab A')).toBeInTheDocument()
    expect(await screen.findByText('QR-400')).toBeInTheDocument()
  })
})
