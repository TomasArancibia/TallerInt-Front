import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import HorariosVisitasBanco from '../HorariosVisitasBanco.jsx'

describe('HorariosVisitasBanco', () => {
  it('renders horarios and images', () => {
    render(
      <MemoryRouter>
        <HorariosVisitasBanco />
      </MemoryRouter>
    )

    expect(screen.getByText(/HORARIOS VISITAS \/ BANCO DE SANGRE/)).toBeInTheDocument()
    // images should have alt text
    expect(screen.getByAltText(/Cuadro de horarios de visitas/)).toBeInTheDocument()
    expect(screen.getByAltText(/Tabla de horarios del banco de sangre/)).toBeInTheDocument()
  })
})
