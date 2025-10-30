import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoGesCaecLey from '../InfoGesCaecLey.jsx'

describe('InfoGesCaecLey', () => {
  it('renders GES CAEC LEY page heading', () => {
    render(
      <MemoryRouter>
        <InfoGesCaecLey />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
