import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoPresupuestos from '../InfoPresupuestos.jsx'

describe('InfoPresupuestos', () => {
  it('renders presupuestos content', () => {
    render(
      <MemoryRouter>
        <InfoPresupuestos />
      </MemoryRouter>
    )

    // Check that page rendered by asserting the Logo is present (robust)
    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
