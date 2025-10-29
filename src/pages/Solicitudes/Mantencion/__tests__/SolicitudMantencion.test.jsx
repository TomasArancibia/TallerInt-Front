import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import SolicitudMantencion from '../SolicitudMantencion.jsx'

beforeEach(() => {
  sessionStorage.setItem('id_cama', '42')
  // mock fetch for areas
  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: async () => ([]) }))
})

afterEach(() => {
  sessionStorage.clear()
  vi.resetAllMocks()
})

describe('SolicitudMantencion page', () => {
  it('renders contact form when id_cama present and loads areas', async () => {
    render(
      <MemoryRouter initialEntries={["/solicitudmantencion"]}>
        <Routes>
          <Route path="/solicitudmantencion" element={<SolicitudMantencion />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByLabelText(/Nombre y Apellido/i)).toBeInTheDocument()
    await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  })
})
