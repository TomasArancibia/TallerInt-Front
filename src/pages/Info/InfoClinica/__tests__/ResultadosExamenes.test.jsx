import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import ResultadosExamenes from '../ResultadosExamenes.jsx'

describe('ResultadosExamenes', () => {
  it('renders resultados de examenes page', () => {
    render(
      <MemoryRouter>
        <ResultadosExamenes />
      </MemoryRouter>
    )

    expect(screen.getByText(/RESULTADOS DE EXÁMENES/)).toBeInTheDocument()
    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
