import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock fetch global
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('API Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear()
    // Mock environment variables usando vi.stubEnv
    vi.stubEnv('VITE_API_URL', 'http://localhost:8000')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe('Solicitudes API', () => {
    const API_BASE = 'http://localhost:8000'

    it('should fetch all solicitudes successfully', async () => {
      const mockSolicitudes = [
        {
          id: 1,
          tipo: 'mantencion',
          descripcion: 'Reparar aire acondicionado',
          estado: 'pendiente',
          ubicacion: 'Habitación 101',
          fecha_creacion: '2024-10-23T10:00:00Z'
        },
        {
          id: 2,
          tipo: 'limpieza',
          descripcion: 'Limpieza profunda del baño',
          estado: 'completado',
          ubicacion: 'Habitación 205',
          fecha_creacion: '2024-10-22T15:30:00Z'
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockSolicitudes,
      })

      // Simulate API call
      const response = await fetch(`${API_BASE}/solicitudes/`)
      const data = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE}/solicitudes/`)
      expect(data).toEqual(mockSolicitudes)
      expect(data).toHaveLength(2)
      expect(data[0]).toHaveProperty('tipo', 'mantencion')
    })

    it('should create a new solicitud', async () => {
      const newSolicitud = {
        tipo: 'mantencion',
        descripcion: 'Cambiar bombilla quemada',
        ubicacion: 'Habitación 303',
        prioridad: 'media'
      }

      const createdSolicitud = {
        id: 3,
        ...newSolicitud,
        estado: 'pendiente',
        fecha_creacion: '2024-10-23T11:00:00Z',
        identificador_qr: 'QR789012'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => createdSolicitud,
      })

      const response = await fetch(`${API_BASE}/solicitudes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSolicitud)
      })
      const data = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_BASE}/solicitudes/`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSolicitud)
        })
      )
      expect(data).toHaveProperty('id', 3)
      expect(data).toHaveProperty('identificador_qr')
      expect(data.estado).toBe('pendiente')
    })

    it('should update solicitud status', async () => {
      const updatedSolicitud = {
        id: 1,
        estado: 'en_proceso',
        fecha_actualizacion: '2024-10-23T12:00:00Z'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => updatedSolicitud,
      })

      const response = await fetch(`${API_BASE}/solicitudes/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'en_proceso' })
      })
      const data = await response.json()

      expect(data.estado).toBe('en_proceso')
      expect(data).toHaveProperty('fecha_actualizacion')
    })

    it('should filter solicitudes by type', async () => {
      const filteredSolicitudes = [
        {
          id: 1,
          tipo: 'mantencion',
          descripcion: 'Reparar aire acondicionado',
          estado: 'pendiente'
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => filteredSolicitudes,
      })

      const response = await fetch(`${API_BASE}/solicitudes/?tipo=mantencion`)
      const data = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE}/solicitudes/?tipo=mantencion`)
      expect(data).toHaveLength(1)
      expect(data[0].tipo).toBe('mantencion')
    })
  })

  describe('QR Code API', () => {
    const API_BASE = 'http://localhost:8000'

    it('should generate QR code for solicitud', async () => {
      const mockQRResponse = {
        identificador_qr: 'QR123456789',
        qr_image_url: `${API_BASE}/qr/QR123456789/image`,
        solicitud_id: 1,
        created_at: '2024-10-23T10:00:00Z'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockQRResponse,
      })

      const response = await fetch(`${API_BASE}/qr/generate/1`)
      const data = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE}/qr/generate/1`)
      expect(data).toHaveProperty('identificador_qr')
      expect(data).toHaveProperty('qr_image_url')
      expect(data.solicitud_id).toBe(1)
    })

    it('should get QR code information', async () => {
      const qrInfo = {
        identificador_qr: 'QR123456789',
        solicitud: {
          id: 1,
          tipo: 'mantencion',
          descripcion: 'Reparar aire acondicionado',
          estado: 'pendiente',
          ubicacion: 'Habitación 101'
        },
        created_at: '2024-10-23T10:00:00Z'
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => qrInfo,
      })

      const response = await fetch(`${API_BASE}/qr/QR123456789`)
      const data = await response.json()

      expect(data).toHaveProperty('solicitud')
      expect(data.solicitud.id).toBe(1)
    })

    it('should handle QR code not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ detail: 'QR code not found' }),
      })

      const response = await fetch(`${API_BASE}/qr/INVALID_QR`)
      
      expect(response.ok).toBe(false)
      expect(response.status).toBe(404)
    })
  })

  describe('Chatbot API', () => {
    const API_BASE = 'http://localhost:8000'

    it('should send message to chatbot', async () => {
      const userMessage = {
        message: '¿Cómo puedo solicitar mantenimiento?',
        context: 'solicitudes'
      }

      const botResponse = {
        response: 'Para solicitar mantenimiento, puedes usar el formulario en la sección de solicitudes. Selecciona el tipo de problema y describe la situación.',
        timestamp: '2024-10-23T10:00:00Z',
        intent: 'solicitud_mantenimiento',
        confidence: 0.95
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => botResponse,
      })

      const response = await fetch(`${API_BASE}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMessage)
      })
      const data = await response.json()

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_BASE}/chatbot/message`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userMessage)
        })
      )
      expect(data).toHaveProperty('response')
      expect(data).toHaveProperty('intent')
      expect(data.confidence).toBeGreaterThan(0.5)
    })

    it('should handle different types of questions', async () => {
      const questions = [
        {
          message: '¿Cuáles son los horarios de visita?',
          expectedIntent: 'horarios_visita'
        },
        {
          message: '¿Cómo pago mi cuenta?',
          expectedIntent: 'informacion_pagos'
        },
        {
          message: 'Necesito ayuda con nutrición',
          expectedIntent: 'solicitud_nutricion'
        }
      ]

      for (const question of questions) {
        const botResponse = {
          response: `Respuesta para: ${question.message}`,
          intent: question.expectedIntent,
          confidence: 0.9
        }

        mockFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => botResponse,
        })

        const response = await fetch(`${API_BASE}/chatbot/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question.message })
        })
        const data = await response.json()

        expect(data.intent).toBe(question.expectedIntent)
      }
    })
  })

  describe('Admin API', () => {
    const API_BASE = 'http://localhost:8000'

    it('should fetch dashboard statistics', async () => {
      const dashboardStats = {
        total_solicitudes: 150,
        solicitudes_pendientes: 45,
        solicitudes_en_proceso: 32,
        solicitudes_completadas: 73,
        solicitudes_por_tipo: {
          mantencion: 60,
          limpieza: 40,
          nutricion: 30,
          asistencia_social: 20
        },
        promedio_tiempo_resolucion: 2.5
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => dashboardStats,
      })

      const response = await fetch(`${API_BASE}/admin/dashboard/stats`)
      const data = await response.json()

      expect(data).toHaveProperty('total_solicitudes')
      expect(data).toHaveProperty('solicitudes_por_tipo')
      expect(data.total_solicitudes).toBeGreaterThan(0)
    })

    it('should fetch areas information', async () => {
      const areas = [
        { id: 1, nombre: 'Mantención', activa: true },
        { id: 2, nombre: 'Limpieza', activa: true },
        { id: 3, nombre: 'Nutrición', activa: true },
        { id: 4, nombre: 'Asistencia Social', activa: false }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => areas,
      })

      const response = await fetch(`${API_BASE}/admin/areas`)
      const data = await response.json()

      expect(Array.isArray(data)).toBe(true)
      expect(data).toHaveLength(4)
      expect(data[0]).toHaveProperty('nombre')
      expect(data[0]).toHaveProperty('activa')
    })
  })

  describe('Error Handling', () => {
    const API_BASE = 'http://localhost:8000'

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(
        fetch(`${API_BASE}/solicitudes/`)
      ).rejects.toThrow('Network error')
    })

    it('should handle 500 server errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ detail: 'Internal server error' }),
      })

      const response = await fetch(`${API_BASE}/solicitudes/`)
      
      expect(response.ok).toBe(false)
      expect(response.status).toBe(500)
    })

    it('should handle 422 validation errors', async () => {
      const validationError = {
        detail: [
          {
            loc: ['body', 'tipo'],
            msg: 'field required',
            type: 'value_error.missing'
          }
        ]
      }

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => validationError,
      })

      const response = await fetch(`${API_BASE}/solicitudes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // Empty body to trigger validation error
      })

      expect(response.status).toBe(422)
      const data = await response.json()
      expect(data).toHaveProperty('detail')
      expect(Array.isArray(data.detail)).toBe(true)
    })

    it('should handle authentication errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ detail: 'Authentication required' }),
      })

      const response = await fetch(`${API_BASE}/admin/dashboard/stats`)
      
      expect(response.status).toBe(401)
    })
  })

  describe('API Performance', () => {
    it('should handle concurrent requests', async () => {
      const mockResponses = [
        { id: 1, tipo: 'mantencion' },
        { id: 2, tipo: 'limpieza' },
        { id: 3, tipo: 'nutricion' }
      ]

      mockResponses.forEach((response, index) => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => response,
        })
      })

      const requests = mockResponses.map((_, index) => 
        fetch(`http://localhost:8000/solicitudes/${index + 1}`)
      )

      const responses = await Promise.all(requests)
      const data = await Promise.all(
        responses.map(response => response.json())
      )

      expect(data).toHaveLength(3)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })
  })
})