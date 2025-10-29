import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import AsistenciaSocial from '../AsistenciaSocial/AsistenciaSocial.jsx'

describe('AsistenciaSocial', () => {
  it('renders asistencia social page', () => {
    render(
      <MemoryRouter>
        <AsistenciaSocial />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
