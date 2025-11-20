import '@testing-library/jest-dom'
import { vi, beforeEach } from 'vitest'

// Mock axios
vi.mock('axios', async () => {
  const actual = await vi.importActual('axios')
  return {
    ...actual,
    default: {
      create: () => ({
        get: vi.fn(() => Promise.resolve({ data: [] })),
        post: vi.fn(() => Promise.resolve({ data: { success: true } })),
        put: vi.fn(() => Promise.resolve({ data: { success: true } })),
        delete: vi.fn(() => Promise.resolve({ data: { success: true } })),
        patch: vi.fn(() => Promise.resolve({ data: { success: true } })),
      }),
      get: vi.fn(() => Promise.resolve({ data: [] })),
      post: vi.fn(() => Promise.resolve({ data: { success: true } })),
      put: vi.fn(() => Promise.resolve({ data: { success: true } })),
      delete: vi.fn(() => Promise.resolve({ data: { success: true } })),
      patch: vi.fn(() => Promise.resolve({ data: { success: true } })),
    }
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock global fetch
global.fetch = vi.fn()

// Default mock responses
const mockResponses = {
  '/areas': { ok: true, json: () => Promise.resolve([{ nombre: 'Area Test' }]) },
  '/solicitudes': { ok: true, json: () => Promise.resolve({ id: 1, mensaje: 'Success' }) },
  '/admin/dashboard': { ok: true, json: () => Promise.resolve({ total_solicitudes: 100 }) },
  '/admin/usuarios': { ok: true, json: () => Promise.resolve([{ id: 1, nombre: 'Usuario Test' }]) },
  '/qr/': { ok: true, json: () => Promise.resolve({ url: 'test-qr-url' }) },
  '/chatbot/chat': { ok: true, json: () => Promise.resolve({ response: 'Test response' }) }
}

// Setup default fetch mock implementation
beforeEach(() => {
  if (fetch.mockImplementation) {
    fetch.mockImplementation((url, options) => {
      const method = options?.method || 'GET'
      let endpoint = url
      
      // Extract endpoint from full URL
      if (typeof url === 'string') {
        try {
          const urlObj = new URL(url, 'http://localhost')
          endpoint = urlObj.pathname
        } catch {
          endpoint = url
        }
      }
      
      // Handle specific endpoints
      for (const [path, response] of Object.entries(mockResponses)) {
        if (endpoint.includes(path)) {
          return Promise.resolve(response)
        }
      }
      
      // Default successful response
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true })
      })
    })
  }
})