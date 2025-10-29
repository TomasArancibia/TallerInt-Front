import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoRolPagare from '../InfoRolPagare.jsx'

describe('InfoRolPagare', () => {
  it('renders rol pagare content', () => {
    render(
      <MemoryRouter>
        <InfoRolPagare />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
