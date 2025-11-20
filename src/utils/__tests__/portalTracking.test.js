import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import {
  getApiBaseUrl,
  ensurePortalSessionId,
  getPortalTrackingContext,
  trackPortalButtonClick,
  PORTAL_SESSION_KEY,
} from '../portalTracking.js'

// Create proper mocks
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}

const mockCrypto = {
  randomUUID: vi.fn(() => 'mocked-uuid-1234'),
}

const mockNavigator = {
  sendBeacon: vi.fn(() => true),
}

const mockFetch = vi.fn(() => Promise.resolve({ ok: true }))

describe('portalTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Setup global mocks
    vi.stubGlobal('sessionStorage', mockSessionStorage)
    vi.stubGlobal('crypto', mockCrypto)
    vi.stubGlobal('navigator', mockNavigator)
    vi.stubGlobal('fetch', mockFetch)
    
    // Reset window location
    delete window.location
    window.location = { pathname: '/test-path' }
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('getApiBaseUrl', () => {
    it('returns the API base URL', () => {
      const baseUrl = getApiBaseUrl()
      expect(typeof baseUrl).toBe('string')
    })
  })

  describe('ensurePortalSessionId', () => {
    it('returns existing session ID if present', () => {
      mockSessionStorage.getItem.mockReturnValue('existing-session-123')
      
      const sessionId = ensurePortalSessionId()
      
      expect(sessionId).toBe('existing-session-123')
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith(PORTAL_SESSION_KEY)
    })

    it('creates new session ID if none exists using crypto.randomUUID', () => {
      mockSessionStorage.getItem.mockReturnValue(null)
      
      const sessionId = ensurePortalSessionId()
      
      expect(sessionId).toBe('mocked-uuid-1234')
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(PORTAL_SESSION_KEY, 'mocked-uuid-1234')
    })

    it('creates fallback session ID when crypto.randomUUID is not available', () => {
      mockSessionStorage.getItem.mockReturnValue(null)
      vi.stubGlobal('crypto', undefined)
      
      const sessionId = ensurePortalSessionId()
      
      expect(sessionId).toMatch(/^sess-\d+-[a-f0-9]+$/)
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(PORTAL_SESSION_KEY, sessionId)
    })

    it('returns null in server environment', () => {
      const originalWindow = global.window
      delete global.window
      
      const sessionId = ensurePortalSessionId()
      
      expect(sessionId).toBeNull()
      
      global.window = originalWindow
    })
  })

  describe('getPortalTrackingContext', () => {
    it('returns tracking context with all values', () => {
      mockSessionStorage.getItem.mockImplementation((key) => {
        switch (key) {
          case 'id_cama': return '123'
          case 'qr_code': return 'QR123'
          case PORTAL_SESSION_KEY: return 'session-456'
          default: return null
        }
      })
      
      const context = getPortalTrackingContext()
      
      expect(context).toEqual({
        id_cama: 123,
        qr_code: 'QR123',
        portal_session_id: 'session-456',
      })
    })

    it('handles invalid id_cama', () => {
      mockSessionStorage.getItem.mockImplementation((key) => {
        switch (key) {
          case 'id_cama': return 'invalid'
          case 'qr_code': return null
          case PORTAL_SESSION_KEY: return 'session-456'
          default: return null
        }
      })
      
      const context = getPortalTrackingContext()
      
      expect(context).toEqual({
        id_cama: null,
        qr_code: null,
        portal_session_id: 'session-456',
      })
    })

    it('creates session ID if missing', () => {
      mockSessionStorage.getItem.mockImplementation((key) => {
        if (key === PORTAL_SESSION_KEY) return null
        return null
      })
      
      const context = getPortalTrackingContext()
      
      expect(context.portal_session_id).toBe('mocked-uuid-1234')
    })

    it('returns null in server environment', () => {
      const originalWindow = global.window
      delete global.window
      
      const context = getPortalTrackingContext()
      
      expect(context).toBeNull()
      
      global.window = originalWindow
    })
  })

  describe('trackPortalButtonClick', () => {
    beforeEach(() => {
      mockSessionStorage.getItem.mockImplementation((key) => {
        switch (key) {
          case 'id_cama': return '456'
          case 'qr_code': return 'QR456'
          case PORTAL_SESSION_KEY: return 'session-789'
          default: return null
        }
      })
    })

    it('sends tracking data using sendBeacon when available', () => {
      trackPortalButtonClick({
        buttonCode: 'test-button',
        buttonLabel: 'Test Button',
        categoria: 'navigation',
        sourcePath: '/source',
        targetPath: '/target',
      })

      expect(mockNavigator.sendBeacon).toHaveBeenCalledWith(
        expect.stringContaining('/analytics/button-click'),
        expect.any(Blob)
      )
    })

    it('falls back to fetch when sendBeacon is not available', () => {
      vi.stubGlobal('navigator', {})
      
      trackPortalButtonClick({
        buttonCode: 'test-button',
        buttonLabel: 'Test Button',
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/analytics/button-click'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('test-button'),
          keepalive: true,
        }
      )
    })

    it('does nothing when buttonCode is missing', () => {
      trackPortalButtonClick({
        buttonLabel: 'No Code Button',
      })

      expect(mockNavigator.sendBeacon).not.toHaveBeenCalled()
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('does nothing in server environment', () => {
      const originalWindow = global.window
      delete global.window
      
      trackPortalButtonClick({
        buttonCode: 'server-button',
      })

      expect(mockNavigator.sendBeacon).not.toHaveBeenCalled()
      expect(mockFetch).not.toHaveBeenCalled()
      
      global.window = originalWindow
    })
  })
})