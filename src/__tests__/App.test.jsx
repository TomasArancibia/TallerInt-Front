import { describe, it, expect } from 'vitest'

// Test simple que verifica que el módulo se puede importar
describe('App', () => {
  it('can import App component', async () => {
    const { default: App } = await import('../App.jsx')
    expect(App).toBeDefined()
    expect(typeof App).toBe('function')
  }, 20000)

  it('App component has correct name', async () => {
    const { default: App } = await import('../App.jsx')
    expect(App.name).toBe('App')
  }, 20000)
})