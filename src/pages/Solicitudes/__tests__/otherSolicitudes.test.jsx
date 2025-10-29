import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Nutricion from '../../Solicitudes/Nutricion/Nutricion.jsx'
import Acompanamiento from '../../Solicitudes/AcompanamientoEspiritual/AcompanamientoEspiritual.jsx'
import AsistenciaSocial from '../../Solicitudes/AsistenciaSocial/AsistenciaSocial.jsx'

describe('Other Solicitudes smoke tests', () => {
  it('renders Nutricion page', () => {
    // Nutricion requires a valid session QR/context. Set id_cama to simulate.
    sessionStorage.setItem('id_cama', '9')
    render(
      <MemoryRouter>
        <Nutricion />
      </MemoryRouter>
    )

    expect(screen.getByText(/NUTRICIÓN/)).toBeTruthy()
  })

  it('renders Acompanamiento Espiritual page', () => {
    // ensure session context
    sessionStorage.setItem('id_cama', '11')
    render(
      <MemoryRouter>
        <Acompanamiento />
      </MemoryRouter>
    )

    // the component shows "ACOMPAÑAMIENTO SOCIAL Y/O ESPIRITUAL"
    expect(screen.getByText(/ACOMPAÑAMIENTO.*ESPIRITUAL/i)).toBeTruthy()
  })

  it('renders Asistencia Social page', () => {
    render(
      <MemoryRouter>
        <AsistenciaSocial />
      </MemoryRouter>
    )

    expect(screen.getByText(/ASISTENCIA SOCIAL/i)).toBeTruthy()
  })
})
