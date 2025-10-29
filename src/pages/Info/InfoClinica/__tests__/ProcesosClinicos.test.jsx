import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ProcesosClinicos from '../ProcesosClinicos.jsx'

describe('ProcesosClinicos', () => {
  it('renders procesos clinicos section', () => {
    render(
      <MemoryRouter>
        <ProcesosClinicos />
      </MemoryRouter>
    )

    expect(screen.getByText(/INFORMACIÓN DE PROCESOS CLÍNICOS AL PACIENTE/)).toBeInTheDocument()
    expect(screen.getByText(/RESULTADOS DE EXÁMENES/)).toBeInTheDocument()
  })
})
