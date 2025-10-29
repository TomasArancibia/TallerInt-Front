import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoDifVisAco from '../InfoDifVisAco.jsx'

describe('InfoDifVisAco', () => {
  it('renders diferencias visitas y acompañamiento', () => {
    render(
      <MemoryRouter>
        <InfoDifVisAco />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
