import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({ getAccessToken: async () => 'TOKEN', signOut: async () => {} }),
}))

import Dashboard from '../Dashboard.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Dashboard page', () => {
  it('renders and loads bootstrap + metricas', async () => {
    global.fetch = vi.fn((url) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: async () => ({ usuario: { rol: 'ADMIN' }, hospitales: [{ nombre: 'H1' }], areas: [{ id_area: 1, nombre: 'Area1' }] }),
        })
      }
      if (String(url).includes('/admin/metricas')) {
        return Promise.resolve({
          status: 200,
          ok: true,
          json: async () => ({
            por_area: [{ nombre_area: 'Area1', total_solicitudes: 5 }],
            por_hospital_estado: [{ nombre_hospital: 'H1', estado: 'pendiente', total_solicitudes: 1 }],
            por_area_dia: [],
            promedio_resolucion_area: [],
            promedio_resolucion_hospital: [],
            portal_analytics: {
              secciones_mas_visitadas: [{ seccion: '/inicio', label: 'Inicio', categoria: 'info', total_clicks: 3, porcentaje: 60 }],
              camas_con_mas_sesiones: [{ id_cama: 7, cama: 'A', habitacion: 'H-101', institucion: 'H1', total_sesiones: 4 }],
              chat_keywords: [{ keyword: 'visita', total: 2, porcentaje: 50 }],
            },
          }),
        })
      }
      return Promise.resolve({ status: 200, ok: true, json: async () => ({}) })
    })

    render(<Dashboard />)

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()

    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    const matches = await screen.findAllByText(/Totales por �?rea/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
    const areaMatches = await screen.findAllByText('Area1')
    expect(areaMatches.length).toBeGreaterThanOrEqual(1)
    const totalMatches = await screen.findAllByText('5')
    expect(totalMatches.length).toBeGreaterThanOrEqual(1)

    expect(await screen.findByText(/Uso del portal QR/i)).toBeInTheDocument()
    expect(await screen.findByText(/Secciones mǭs visitadas/i)).toBeInTheDocument()
  })
})
