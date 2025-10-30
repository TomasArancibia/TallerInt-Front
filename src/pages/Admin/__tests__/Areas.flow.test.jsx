import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => {
  const adminCtx = { usuario: { rol: 'ADMIN' }, getAccessToken: async () => 'TOKEN' }
  return { useAdminAuth: () => adminCtx }
})

import Areas from '../Areas.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('Areas page', () => {
  it('shows areas and indicates when there are no encargados', async () => {
    const bootstrap = { areas: [{ id_area: 7, nombre: 'Area Test' }] }
    // users endpoint returns empty list
    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) return Promise.resolve({ ok: true, status: 200, json: async () => bootstrap })
      if (String(url).includes('/admin/users')) return Promise.resolve({ ok: true, json: async () => ({ usuarios: [] }) })
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Areas />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    expect(await screen.findByText(/Áreas de Solicitudes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Resultados: 1/)).toBeInTheDocument()
    expect(await screen.findByText('Area Test')).toBeInTheDocument()
    expect(await screen.findByText(/Sin encargados/i)).toBeInTheDocument()
  })

  it('lists encargados when users exist', async () => {
    const bootstrap = { areas: [{ id_area: 8, nombre: 'Area Con Encargado' }] }
    const users = { usuarios: [{ id: 101, nombre: 'Enc', apellido: 'Uno', correo: 'enc@uc.cl', activo: true, id_area: 8 }] }
    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) return Promise.resolve({ ok: true, status: 200, json: async () => bootstrap })
      if (String(url).includes('/admin/users')) return Promise.resolve({ ok: true, json: async () => users })
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Areas />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    expect(await screen.findByText('Area Con Encargado')).toBeInTheDocument()
    // the user name should be present in the encargados list
    expect(await screen.findByText(/Enc Uno/)).toBeInTheDocument()
    expect(await screen.findByText(/enc@uc.cl/)).toBeInTheDocument()
  })
})
