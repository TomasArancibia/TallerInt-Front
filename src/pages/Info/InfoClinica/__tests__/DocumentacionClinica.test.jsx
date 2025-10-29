import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import DocumentacionClinica from '../DocumentacionClinica.jsx'

describe('DocumentacionClinica', () => {
  it('renders documentación clínica content', () => {
    render(
      <MemoryRouter>
        <DocumentacionClinica />
      </MemoryRouter>
    )

    expect(screen.getByText(/DOCUMENTACIÓN CLÍNICA/)).toBeInTheDocument()
    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
