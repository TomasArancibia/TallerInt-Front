import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock admin auth
vi.mock('../../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({ getAccessToken: async () => 'TOKEN', signOut: async () => {} }),
}))

import Solicitudes from '../Solicitudes.jsx'

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: async () => ({ usuario: { rol: 'ADMIN' }, areas: [], hospitales: [], edificios: [], pisos: [], habitaciones: [], camas: [], solicitudes: [] }) }))
})

describe('Solicitudes page', () => {
  it('renders header and loads bootstrap', async () => {
    render(
      <MemoryRouter>
        <Solicitudes />
      </MemoryRouter>
    )

    expect(screen.getByText(/Solicitudes/i)).toBeInTheDocument()

    // wait for status ok to be set (fetch mocked)
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })
})
