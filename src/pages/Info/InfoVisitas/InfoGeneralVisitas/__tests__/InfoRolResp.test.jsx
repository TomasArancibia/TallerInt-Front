import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import InfoRolResp from '../InfoRolResp.jsx'

describe('InfoRolResp', () => {
  it('renders rol responsable content', () => {
    render(
      <MemoryRouter>
        <InfoRolResp />
      </MemoryRouter>
    )

    expect(screen.getByAltText(/UC Christus/i)).toBeInTheDocument()
  })
})
