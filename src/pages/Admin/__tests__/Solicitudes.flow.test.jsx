import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => {
  const adminCtx = { usuario: { rol: 'ADMIN' }, getAccessToken: async () => 'TOKEN' }
  return { useAdminAuth: () => adminCtx }
})

import Solicitudes from '../Solicitudes.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

afterEach(() => {
  if (window.confirm && window.confirm.mockRestore) {
    window.confirm.mockRestore()
  }
})

describe('Solicitudes admin flows', () => {
  it('can hide results by selecting "Ninguno" on Estado', async () => {
    // prepare bootstrap with two solicitudes (use current date so they fall into default range)
    const now = new Date().toISOString()
    const solicitudes = [
      { id: 1, id_area: 10, id_cama: 100, nombre_solicitante: 'Ana', fecha_creacion: now, estado: 'pendiente', tipo: 'sub', descripcion: 'desc' },
      { id: 2, id_area: 10, id_cama: 101, nombre_solicitante: 'Bob', fecha_creacion: now, estado: 'en_proceso', tipo: 'sub2', descripcion: 'desc2' }
    ]

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({
          usuario: { rol: 'ADMIN' },
          areas: [{ id_area: 10, nombre: 'Area X' }],
          hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [],
          solicitudes
        }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Solicitudes />)

    // wait for bootstrap fetch
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // Both solicitudes should be counted
    expect(await screen.findByText(/Resultados: 2/)).toBeInTheDocument()

  // Open Estado multiselect and click 'Ninguno'
  // The MultiSelect button shows a text like '3 seleccionados' so find it by role
  const estadoBtn = screen.getByRole('button', { name: /seleccionad/i })
  await userEvent.click(estadoBtn)
    // 'Ninguno' button exists in the menu
    const ninguno = await screen.findByText(/Ninguno/i)
    await userEvent.click(ninguno)

    // Now results should be 0
    expect(await screen.findByText(/Resultados: 0/)).toBeInTheDocument()
  })

  it('toggles row expansion to show description', async () => {
    const now = new Date().toISOString()
    const solicitudes = [
      { id: 5, id_area: 10, id_cama: 100, nombre_solicitante: 'Carlos', fecha_creacion: now, estado: 'pendiente', tipo: 't1', descripcion: 'detalle aqui' }
    ]

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({
          usuario: { rol: 'ADMIN' },
          areas: [{ id_area: 10, nombre: 'Area X' }],
          hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [],
          solicitudes
        }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Solicitudes />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

  // find the row by solicitante name (component no longer shows numeric id)
  const rowId = await screen.findByText('Carlos')
    // click the row to expand
    await userEvent.click(rowId)

    // description should be visible in expanded area
    expect(await screen.findByText(/detalle aqui/)).toBeInTheDocument()
  })

  it('changes solicitud estado via PUT when JEFE_AREA user', async () => {
    // we'll stub getAccessToken via the global fetch mock below and provide JEFE_AREA in bootstrap response
    const now = new Date().toISOString()
    const initial = [
      { id: 9, id_area: 10, id_cama: 100, nombre_solicitante: 'Diego', fecha_creacion: now, estado: 'pendiente', tipo: 't', descripcion: 'x' }
    ]

    global.fetch = vi.fn((url, opts) => {
      if (String(url).includes('/admin/bootstrap')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({
          usuario: { rol: 'JEFE_AREA', id_area: 10 },
          areas: [{ id_area: 10, nombre: 'Area X' }],
          hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [],
          solicitudes: initial
        }) })
      }

      // handle PUT to change estado
      if (opts && opts.method === 'PUT' && String(url).includes('/solicitudes/9/estado')) {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({ solicitud: { ...initial[0], estado: 'en_proceso' } }) })
      }

      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Solicitudes />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // select element should be visible for JEFE_AREA
    const select = await screen.findByDisplayValue(/pendiente/i)
    // change to 'en_proceso'
    fireEvent.change(select, { target: { value: 'en_proceso' } })

    // expect a PUT call to the proper endpoint
    await waitFor(() => {
      const calledPut = global.fetch.mock.calls.some(c => String(c[0]).includes('/solicitudes/9/estado') && c[1] && c[1].method === 'PUT')
      expect(calledPut).toBeTruthy()
    })
  })
})
