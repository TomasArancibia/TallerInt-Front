import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoCuentaPagos from '../InfoCuentaPagos.jsx'

describe('InfoCuentaPagos', () => {
  it('renders pagos section', () => {
    render(
      <MemoryRouter>
        <InfoCuentaPagos />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
