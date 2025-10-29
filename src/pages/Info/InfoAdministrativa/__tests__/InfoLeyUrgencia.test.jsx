import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoLeyUrgencia from '../InfoLeyUrgencia.jsx'

describe('InfoLeyUrgencia', () => {
  it('renders ley de urgencia section', () => {
    render(
      <MemoryRouter>
        <InfoLeyUrgencia />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
