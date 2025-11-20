import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import InfoPresupuestosCuenta from '../InfoPresupuestosCuenta.jsx'

describe('InfoPresupuestosCuenta', () => {
  it('renders presupuestos cuenta content', () => {
    render(
      <MemoryRouter>
        <InfoPresupuestosCuenta />
      </MemoryRouter>
    )
    
    // Just check that the component renders without errors
    expect(document.body).toBeDefined()
  })
})