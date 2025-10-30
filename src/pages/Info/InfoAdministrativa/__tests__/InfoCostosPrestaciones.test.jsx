import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoCostosPrestaciones from '../InfoCostosPrestaciones.jsx'

describe('InfoCostosPrestaciones', () => {
  it('renders costos prestaciones content', () => {
    render(
      <MemoryRouter>
        <InfoCostosPrestaciones />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
