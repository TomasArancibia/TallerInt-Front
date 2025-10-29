import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Mantencion from '../Mantencion.jsx'

beforeEach(() => {
  sessionStorage.setItem('id_cama', '1')
})

afterEach(() => {
  sessionStorage.clear()
})

describe('Mantencion page', () => {
  it('renders options when there is id_cama', () => {
    render(
      <MemoryRouter>
        <Mantencion />
      </MemoryRouter>
    )

    expect(screen.getByText(/SOLICITUDES DE MANTENCIÓN - COMODIDAD/i)).toBeInTheDocument()
  })
})
