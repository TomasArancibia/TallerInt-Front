import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// We'll manipulate history before importing App so Router picks up the path
describe('App routing (smoke)', () => {
  it('renders Chatbot when navigating to /chatbot', async () => {
    // set URL
    window.history.pushState({}, 'Chatbot', '/chatbot')
    const { default: App } = await import('../App.jsx')
    render(<App />)
    // The Chatbot component renders a header with 'Asistente' — locate the heading role to avoid matching message text
    expect(await screen.findByRole('heading', { name: /Asistente/i })).toBeInTheDocument()
  }, 20000)
})
