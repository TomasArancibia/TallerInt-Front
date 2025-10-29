import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import BeneficiosSociales from '../BeneficiosSociales.jsx'

describe('BeneficiosSociales', () => {
  it('renders beneficios sociales heading', () => {
    render(
      <MemoryRouter>
        <BeneficiosSociales />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
