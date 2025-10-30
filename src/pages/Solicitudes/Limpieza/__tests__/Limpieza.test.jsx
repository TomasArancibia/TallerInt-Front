import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Limpieza from '../Limpieza.jsx'

describe('Limpieza', () => {
  it('shows QR prompt when no session context', () => {
    sessionStorage.clear()
    render(
      <MemoryRouter>
        <Limpieza />
      </MemoryRouter>
    )

    expect(screen.getByText(/Esta sección requiere un QR válido/)).toBeInTheDocument()
  })

  it('renders limpieza options when session has id_cama', () => {
    sessionStorage.setItem('id_cama', '7')
    render(
      <MemoryRouter>
        <Limpieza />
      </MemoryRouter>
    )

    expect(screen.getByText(/SOLICITUD DE LIMPIEZA/)).toBeInTheDocument()
    expect(screen.getByText(/Despapelado \(retiro basura\)/)).toBeInTheDocument()
  })
})
