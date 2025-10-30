import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoSugerencias from '../InfoSugerencias.jsx'

describe('InfoSugerencias', () => {
  it('renders sugerencias header', () => {
    render(
      <MemoryRouter>
        <InfoSugerencias />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
