import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import PortalTrackedLink from '../PortalTrackedLink.jsx'
import { trackPortalButtonClick } from '../../utils/portalTracking.js'

// Mock the tracking utility
vi.mock('../../utils/portalTracking.js', () => ({
  trackPortalButtonClick: vi.fn(),
}))

describe('PortalTrackedLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderWithRouter = (component, initialEntries = ['/']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        {component}
      </MemoryRouter>
    )
  }

  it('renders link with text children', () => {
    renderWithRouter(
      <PortalTrackedLink to="/test">Test Link</PortalTrackedLink>
    )
    
    expect(screen.getByRole('link', { name: 'Test Link' })).toBeInTheDocument()
  })

  it('renders link with array children', () => {
    renderWithRouter(
      <PortalTrackedLink to="/test">
        {['Test', ' ', 'Link']}
      </PortalTrackedLink>
    )
    
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('tracks click with default tracking code from target path', () => {
    renderWithRouter(
      <PortalTrackedLink to="/dashboard">Go to Dashboard</PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith({
      buttonCode: '/dashboard',
      buttonLabel: 'Go to Dashboard',
      categoria: null,
      sourcePath: '/',
      targetPath: '/dashboard',
      payload: undefined,
    })
  })

  it('tracks click with custom tracking properties', () => {
    renderWithRouter(
      <PortalTrackedLink
        to="/info"
        trackingCode="custom-code"
        trackingLabel="Custom Label"
        trackingCategory="navigation"
        trackingPayload={{ test: 'data' }}
      >
        Link Text
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith({
      buttonCode: 'custom-code',
      buttonLabel: 'Custom Label',
      categoria: 'navigation',
      sourcePath: '/',
      targetPath: '/info',
      payload: { test: 'data' },
    })
  })

  it('calls custom onClick handler', () => {
    const mockClick = vi.fn()
    
    renderWithRouter(
      <PortalTrackedLink to="/test" onClick={mockClick}>
        Test Link
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(mockClick).toHaveBeenCalled()
    expect(trackPortalButtonClick).toHaveBeenCalled()
  })

  it('handles object-style to prop', () => {
    renderWithRouter(
      <PortalTrackedLink to={{ pathname: '/complex-path' }}>
        Complex Link
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith(
      expect.objectContaining({
        buttonCode: '/complex-path',
        targetPath: '/complex-path',
      })
    )
  })

  it('handles missing or empty children for label extraction', () => {
    renderWithRouter(
      <PortalTrackedLink to="/test">
        <span>Non-text content</span>
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith(
      expect.objectContaining({
        buttonCode: '/test',
        buttonLabel: undefined,
      })
    )
  })

  it('extracts label from array children with mixed content', () => {
    renderWithRouter(
      <PortalTrackedLink to="/test">
        {['Start ', <span key="1">middle</span>, ' End']}
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith(
      expect.objectContaining({
        buttonLabel: 'Start   End',
      })
    )
  })

  it('handles empty string children', () => {
    renderWithRouter(
      <PortalTrackedLink to="/test" trackingLabel="Fallback Label">
        {''}
      </PortalTrackedLink>
    )
    
    fireEvent.click(screen.getByRole('link'))
    
    expect(trackPortalButtonClick).toHaveBeenCalledWith(
      expect.objectContaining({
        buttonCode: '/test',
        buttonLabel: 'Fallback Label',
      })
    )
  })

  it('passes through additional props to Link', () => {
    renderWithRouter(
      <PortalTrackedLink 
        to="/test"
        className="custom-class"
        data-testid="tracked-link"
      >
        Test Link
      </PortalTrackedLink>
    )
    
    const link = screen.getByRole('link')
    expect(link).toHaveClass('custom-class')
    expect(link).toHaveAttribute('data-testid', 'tracked-link')
  })
})