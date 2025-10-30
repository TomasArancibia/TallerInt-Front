import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import CitaPostHospitalizacion from '../CitaPostHospitalizacion.jsx'

describe('CitaPostHospitalizacion', () => {
  it('renders cita post hospitalizacion page', () => {
    render(
      <MemoryRouter>
        <CitaPostHospitalizacion />
      </MemoryRouter>
    )

    expect(screen.getByText(/CITA POST HOSPITALIZACIÓN/)).toBeInTheDocument()
    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
