import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoHorariosVisitas from '../InfoHorariosVisitas.jsx'

describe('InfoHorariosVisitas', () => {
  it('renders horarios visitas content', () => {
    render(
      <MemoryRouter>
        <InfoHorariosVisitas />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
