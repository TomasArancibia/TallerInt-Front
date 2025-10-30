import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoVisitas from '../InfoVisitas.jsx'

describe('InfoVisitas', () => {
  it('renders visitas information and links', () => {
    render(
      <MemoryRouter>
        <InfoVisitas />
      </MemoryRouter>
    )

    expect(screen.getByText(/INFORMACIÓN SOBRE ACOMPAÑANTES Y VISITAS/)).toBeInTheDocument()
    expect(screen.getByText(/INFORMACIÓN GENERAL DE ACOMPAÑANTES Y VISITAS/)).toBeInTheDocument()
  })
})
