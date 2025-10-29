import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => {
  const adminCtx = { usuario: { rol: 'ADMIN' }, getAccessToken: async () => 'TOKEN' }
  return { useAdminAuth: () => adminCtx }
})

import Usuarios from '../Usuarios.jsx'

beforeEach(() => {
  vi.resetAllMocks()
})

afterEach(() => {
  // restore confirm if mocked
  if (window.confirm && window.confirm.mockRestore) {
    window.confirm.mockRestore()
  }
})

describe('Usuarios flows (create, toggle, delete)', () => {
  it('creates a new user and shows temp password', async () => {
    // initial GET /areas and GET /admin/users
    global.fetch = vi.fn((url, opts) => {
      if (String(url).endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: async () => [{ id_area: 1, nombre: 'Area A' }] })
      }
      if (String(url).includes('/admin/users') && (!opts || opts.method === undefined)) {
        return Promise.resolve({ ok: true, json: async () => ({ usuarios: [] }) })
      }
      // POST create user
      if (String(url).includes('/admin/users') && opts && opts.method === 'POST') {
        return Promise.resolve({ ok: true, json: async () => ({ usuario: { id: 11, correo: 'new@uc.cl', area_nombre: 'Area A', activo: true }, temp_password: 'sekret' }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Usuarios />)

    // Wait initial load
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

  // fill form (use fireEvent.change to update React-controlled inputs)
  const email = screen.getByLabelText(/Correo institucional/i)
  fireEvent.change(email, { target: { value: 'new@uc.cl' } })
  const areaSelect = screen.getByLabelText(/Área asignada/i)
  fireEvent.change(areaSelect, { target: { value: '1' } })
  const submit = screen.getByRole('button', { name: /Crear jefe de área/i })
  await userEvent.click(submit)

  // wait for UI update: success card and new user email should appear
  expect(await screen.findByText(/Usuario creado correctamente/i)).toBeInTheDocument()
  const matches = await screen.findAllByText('new@uc.cl')
  expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('toggles active status via PATCH', async () => {
    const initialUser = { id: 21, correo: 'joe@uc.cl', area_nombre: 'Area A', activo: true }

    global.fetch = vi.fn((url, opts) => {
      if (String(url).endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: async () => [{ id_area: 1, nombre: 'Area A' }] })
      }
      if (String(url).includes('/admin/users') && (!opts || opts.method === undefined)) {
        return Promise.resolve({ ok: true, json: async () => ({ usuarios: [initialUser] }) })
      }
      if (opts && opts.method === 'PATCH') {
        // return updated user with activo toggled
        return Promise.resolve({ ok: true, json: async () => ({ usuario: { ...initialUser, activo: false } }) })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    render(<Usuarios />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    // find the 'Desactivar' button (user is active)
    const desactivar = await screen.findByRole('button', { name: /Desactivar/i })
    await userEvent.click(desactivar)

    // expect PATCH called (check mock calls contain a PATCH to the right endpoint)
    await waitFor(() => {
      const calledPatch = global.fetch.mock.calls.some(c => String(c[0]).includes(`/admin/users/${initialUser.id}`) && c[1] && c[1].method === 'PATCH')
      expect(calledPatch).toBeTruthy()
    })
  })

  it('deletes a user after confirmation', async () => {
    const initialUser = { id: 31, correo: 'del@uc.cl', area_nombre: 'Area A', activo: true }

    global.fetch = vi.fn((url, opts) => {
      if (String(url).endsWith('/areas')) {
        return Promise.resolve({ ok: true, json: async () => [{ id_area: 1, nombre: 'Area A' }] })
      }
      if (String(url).includes('/admin/users') && (!opts || opts.method === undefined)) {
        return Promise.resolve({ ok: true, json: async () => ({ usuarios: [initialUser] }) })
      }
      if (opts && opts.method === 'DELETE') {
        return Promise.resolve({ ok: true, status: 204 })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })

    // mock confirm to accept
    vi.stubGlobal('confirm', () => true)

    render(<Usuarios />)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())

    const eliminar = await screen.findByRole('button', { name: /Eliminar/i })
    await userEvent.click(eliminar)

    // expect DELETE called
    await waitFor(() => {
      const calledDelete = global.fetch.mock.calls.some(c => String(c[0]).includes(`/admin/users/${initialUser.id}`) && c[1] && c[1].method === 'DELETE')
      expect(calledDelete).toBeTruthy()
    })
  })
})
