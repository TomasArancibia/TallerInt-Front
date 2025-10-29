import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock useNavigate so we can assert navigation without changing router behavior
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Homepage from '../Homepage.jsx'

beforeEach(() => {
  mockNavigate.mockClear()
  sessionStorage.clear()
})

afterEach(() => {
  sessionStorage.clear()
})

describe('Homepage', () => {
  it('renders Homepage component when session has id_cama', () => {
    // Simular que ya se validó un QR / cama en sessionStorage
    sessionStorage.setItem('id_cama', '1')
    sessionStorage.setItem('qr_code', 'QR-TEST')

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    // Buscar títulos y aviso de cama
    expect(screen.getByText('Informaciones')).toBeInTheDocument()
    expect(screen.getByText(/Operando para/)).toBeInTheDocument()
    expect(screen.getByText(/cama ID 1/)).toBeInTheDocument()
  })

  it('shows QR instruction when no id_cama is present', () => {
    // asegurarse vacío
    sessionStorage.clear()

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Para continuar, escanee el código QR/)).toBeInTheDocument()
    // No debe mostrar el título de Informaciones cuando no hay cama
    expect(screen.queryByText('Informaciones')).toBeNull()
  })

  it('submits a question: stores chat_seed_message and navigates to /chatbot', () => {
    sessionStorage.setItem('id_cama', '42')

    render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText('Escribe una pregunta que quieras resolver')
    const button = screen.getByRole('button', { name: /Enviar/i })

    // Simular escritura y envío
    fireEvent.change(input, { target: { value: '¿Dónde está la enfermera?' } })
    fireEvent.click(button)

    expect(sessionStorage.getItem('chat_seed_message')).toBe('¿Dónde está la enfermera?')
    expect(mockNavigate).toHaveBeenCalledWith('/chatbot')
  })
})