import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoServiciosInstalaciones from '../InfoServiciosInstalaciones.jsx'

describe('InfoServiciosInstalaciones', () => {
  it('renders instalaciones section', () => {
    render(
      <MemoryRouter>
        <InfoServiciosInstalaciones />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
