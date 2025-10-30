import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoComida from '../../InfoServiciosVisitas/InfoServiciosComida.jsx'

describe('InfoComida', () => {
  it('renders food services info', () => {
    render(
      <MemoryRouter>
        <InfoComida />
      </MemoryRouter>
    )

    expect(screen.getByText(/CAFETERÍAS, MARKETPLACES, ETC/)).toBeInTheDocument()
    expect(screen.getByText(/Cafeterías/)).toBeInTheDocument()
  })
})
