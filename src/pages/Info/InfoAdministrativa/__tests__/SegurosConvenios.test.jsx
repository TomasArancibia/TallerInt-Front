import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import SegurosConvenios from '../SegurosConvenios.jsx'

describe('SegurosConvenios', () => {
  it('renders seguros y convenios content', () => {
    render(
      <MemoryRouter>
        <SegurosConvenios />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
