import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock admin auth
vi.mock('../../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({ getAccessToken: async () => 'TOKEN', signOut: async () => {} }),
}))

import Dashboard from '../Dashboard.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Dashboard page', () => {
  it('renders and loads bootstrap + metricas', async () => {
    // bootstrap -> metricas: respond depending on URL to be robust to extra fetches
    global.fetch = vi.fn((url) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ status: 200, ok: true, json: async () => ({ usuario: { rol: 'ADMIN' }, hospitales: [{ nombre: 'H1' }], areas: [{ id_area: 1, nombre: 'Area1' }] }) });
      }
      if (String(url).includes('/admin/metricas')) {
        return Promise.resolve({ status: 200, ok: true, json: async () => ({ por_area: [{ nombre_area: 'Area1', total_solicitudes: 5 }], por_hospital_estado: [{ nombre_hospital: 'H1', estado: 'pendiente', total_solicitudes: 1 }], por_area_dia: [], promedio_resolucion_area: [], promedio_resolucion_hospital: [] }) });
      }
      return Promise.resolve({ status: 200, ok: true, json: async () => ({}) });
    })

    render(<Dashboard />)

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()

    // wait for both fetch calls (bootstrap + metricas)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

  // ensure area card and totals render (use findAllByText because there's a similar longer heading)
  const matches = await screen.findAllByText(/Totales por Área/i)
  expect(matches.length).toBeGreaterThanOrEqual(1)
  const areaMatches = await screen.findAllByText('Area1')
  expect(areaMatches.length).toBeGreaterThanOrEqual(1)
  const totalMatches = await screen.findAllByText('5')
  expect(totalMatches.length).toBeGreaterThanOrEqual(1)
  })
})
