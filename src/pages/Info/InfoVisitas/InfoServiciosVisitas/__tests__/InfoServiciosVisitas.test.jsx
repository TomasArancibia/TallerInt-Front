import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoServiciosVisitas from '../InfoServiciosVisitas.jsx'

describe('InfoServiciosVisitas', () => {
  it('renders servicios visitas main page', () => {
    render(
      <MemoryRouter>
        <InfoServiciosVisitas />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
