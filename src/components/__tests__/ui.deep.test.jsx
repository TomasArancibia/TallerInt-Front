import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import { Logo, PageNav, logoSrc } from '../../components/ui.jsx'

describe('UI components deep tests', () => {
  it('Logo renders with correct src and alt', () => {
    render(<Logo alt="Test Alt" className="test-class" wrapperClassName="wrap" />)
    const img = screen.getByAltText('Test Alt')
    expect(img).toBeInTheDocument()
    // src uses imported asset; ensure attribute exists
    expect(img).toHaveAttribute('src')
    // class applied
    expect(img).toHaveClass('test-class')
  })

  it('PageNav shows back link when backHref provided and always shows home link', () => {
    render(
      <MemoryRouter>
        <PageNav backHref="/prev" backLabel="Atrás" homeLabel="Inicio" />
      </MemoryRouter>
    )

    const back = screen.getByText(/Atrás/)
    const home = screen.getByText(/Inicio/)
    expect(back).toBeInTheDocument()
    expect(home).toBeInTheDocument()
  })
})
