import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoServicioReflexion from '../InfoServicioReflexion.jsx'

describe('InfoServicioReflexion', () => {
  it('renders servicio reflexion page', () => {
    render(
      <MemoryRouter>
        <InfoServicioReflexion />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
