import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoGes from '../InfoGes.jsx'

describe('InfoGes', () => {
  it('renders GES information', () => {
    render(
      <MemoryRouter>
        <InfoGes />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
