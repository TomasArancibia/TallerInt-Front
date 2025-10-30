import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Landing from '../Landing.jsx'

describe('Landing', () => {
  it('renders Landing component', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    )
    
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})