import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Test simple para el componente UI
describe('UI Components', () => {
  it('renders a button component', () => {
    const Button = ({ children }) => (
      <button className="btn">{children}</button>
    )
    
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})