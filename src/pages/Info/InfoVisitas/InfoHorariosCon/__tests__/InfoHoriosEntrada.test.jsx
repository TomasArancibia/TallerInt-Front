import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
// Fix import: correct filename is InfoHorariosEntrada.jsx (typo in test)
import InfoHorariosEntrada from '../InfoHorariosEntrada.jsx'

describe('InfoHoriosEntrada', () => {
  it('renders horario entrada content and image', () => {
    render(
      <MemoryRouter>
        <InfoHorariosEntrada />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
