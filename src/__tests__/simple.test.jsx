import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Simple Test', () => {
  it('should render a basic div', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})