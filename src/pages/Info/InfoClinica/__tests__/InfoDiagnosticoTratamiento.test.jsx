import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoDiagnosticoTratamiento from '../InfoDiagnosticoTratamiento.jsx'

describe('InfoDiagnosticoTratamiento', () => {
  it('renders diagnostico y tratamiento info', () => {
    render(
      <MemoryRouter>
        <InfoDiagnosticoTratamiento />
      </MemoryRouter>
    )

    expect(screen.getByText(/INFORMACIÓN SOBRE DIAGNÓSTICO O TRATAMIENTO/)).toBeInTheDocument()
    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
