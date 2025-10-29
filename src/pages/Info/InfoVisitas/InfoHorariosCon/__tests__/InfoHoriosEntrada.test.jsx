import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoHoriosEntrada from '../InfoHoriosEntrada.jsx'

describe('InfoHoriosEntrada', () => {
  it('renders horario entrada content and image', () => {
    render(
      <MemoryRouter>
        <InfoHoriosEntrada />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
