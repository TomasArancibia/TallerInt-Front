import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AcompanamientoEspiritual from '../AcompanamientoEspiritual.jsx'

describe('AcompanamientoEspiritual', () => {
  it('renders prompt when no id_cama and full menu when id_cama set', () => {
    // without id_cama
    sessionStorage.clear()
    const { rerender } = render(
      <MemoryRouter>
        <AcompanamientoEspiritual />
      </MemoryRouter>
    )
    expect(screen.getByText(/Esta sección requiere un QR válido/)).toBeInTheDocument()

    // with id_cama
    sessionStorage.setItem('id_cama', '5')
    rerender(
      <MemoryRouter>
        <AcompanamientoEspiritual />
      </MemoryRouter>
    )
    expect(screen.getByText(/ACOMPAÑAMIENTO SOCIAL Y\/O ESPIRITUAL/)).toBeInTheDocument()
  })
})
