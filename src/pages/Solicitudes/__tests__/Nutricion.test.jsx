import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Nutricion from '../Nutricion/Nutricion.jsx'

describe('Nutricion', () => {
  it('renders nutricion page (requires id_cama)', () => {
    sessionStorage.setItem('id_cama', '99')
    render(
      <MemoryRouter>
        <Nutricion />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
