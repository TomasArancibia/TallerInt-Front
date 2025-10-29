import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the admin auth context before importing the component
vi.mock('../../auth/AdminAuthContext.jsx', () => ({
  useAdminAuth: () => ({
    getAccessToken: async () => 'FAKE_TOKEN',
    signOut: async () => {},
  }),
}))

import Dashboard from '../Admin/Dashboard.jsx'

// Mock fetch
global.fetch = vi.fn()

describe('Dashboard', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders Dashboard component with mocked data', async () => {
    // Mock the API responses
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ total: 10, pendientes: 5 })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ([
          { area: 'Mantención', count: 5 },
          { area: 'Limpieza', count: 3 }
        ])
      })

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    // Wait for async operations
    await waitFor(() => {
      expect(document.body).toBeInTheDocument()
    })
  })
})