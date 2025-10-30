import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoAdministrativa from '../InfoAdministrativa/InfoAdministrativa.jsx'

describe('InfoAdministrativa', () => {
  it('renders main informational block', () => {
    render(
      <MemoryRouter>
        <InfoAdministrativa />
      </MemoryRouter>
    )

    expect(screen.getByText(/INFORMACIÓN ADMINISTRATIVA A PACIENTES/)).toBeInTheDocument()
    expect(screen.getByText(/Por favor indíquenos de qué área es su consulta/)).toBeInTheDocument()
  })
})
