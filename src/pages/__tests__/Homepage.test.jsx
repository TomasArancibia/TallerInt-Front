import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Homepage from '../Homepage.jsx'

describe('Homepage', () => {
  it('renders Homepage component', () => {
    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )
    
    // Buscar texto que existe en Homepage
    expect(screen.getByText('Informaciones')).toBeInTheDocument()
  })
})