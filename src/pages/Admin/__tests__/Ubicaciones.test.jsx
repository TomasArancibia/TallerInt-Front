import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({ getAccessToken: async () => 'TOKEN', signOut: async () => {} }),
}))

import Ubicaciones from '../Ubicaciones.jsx'

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: async () => ({ hospitales: [], edificios: [], pisos: [], servicios: [], habitaciones: [], camas: [] }) }))
})

describe('Ubicaciones page', () => {
  it('renders header and loads bootstrap', async () => {
    render(
      <MemoryRouter>
        <Ubicaciones />
      </MemoryRouter>
    )

    expect(screen.getByText(/Ubicaciones/i)).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })
})
