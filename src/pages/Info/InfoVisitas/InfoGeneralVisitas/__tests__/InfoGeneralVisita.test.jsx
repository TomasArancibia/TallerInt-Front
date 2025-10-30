import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoGeneralVisita from '../InfoGeneralVisita.jsx'

describe('InfoGeneralVisita', () => {
  it('renders general visita content', () => {
    render(
      <MemoryRouter>
        <InfoGeneralVisita />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
