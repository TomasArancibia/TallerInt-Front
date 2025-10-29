import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoCaec from '../InfoCaec.jsx'

describe('InfoCaec', () => {
  it('renders CAEC section', () => {
    render(
      <MemoryRouter>
        <InfoCaec />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
