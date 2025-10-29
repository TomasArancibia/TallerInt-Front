import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

import SolicitudGenerica from "../Shared/SolicitudGenerica.jsx";

describe("SolicitudGenerica", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("permite completar contacto, detalle y envía la solicitud (happy path)", async () => {
    // Establecer id_cama en sessionStorage para que el componente muestre el formulario
    sessionStorage.setItem('id_cama', '123');
    // Mock para /areas (GET) y /solicitudes (POST)
    global.fetch = vi.fn((url, opts) => {
      if (typeof url === "string" && url.endsWith("/areas")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([{ nombre: "Area A" }]) });
      }
      if (typeof url === "string" && url.endsWith("/solicitudes")) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) });
      }
      return Promise.reject(new Error("unexpected fetch: " + url));
    });

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/", state: { areaName: "Prueba", apiAreaName: "prueba", tipo: "Consulta", backHref: "/", backLabel: "Volver", titulo: "Prueba" } }]}
      >
        <Routes>
          <Route path="/" element={<SolicitudGenerica />} />
        </Routes>
      </MemoryRouter>
    );

    // Paso 1: completar nombre y email
    const nombreInput = screen.getByLabelText(/Nombre y Apellido/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const continuarBtn = screen.getByRole("button", { name: /Continuar/i });

    await userEvent.type(nombreInput, "Juan Pérez");
    await userEvent.type(emailInput, "juan@correo.cl");

    await userEvent.click(continuarBtn);

  // Ahora debería mostrar el paso 2 (verificamos el textarea específico)
  const textarea = await screen.findByLabelText(/Describe tu solicitud/i);
    const enviarBtn = screen.getByRole("button", { name: /Enviar solicitud/i });

  await userEvent.type(textarea, "Detalle de prueba");
    await userEvent.click(enviarBtn);

    // Esperar que se haya llamado al endpoint de solicitudes
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/solicitudes"), expect.any(Object));
    });

    // Y mostrar mensaje de éxito
    expect(await screen.findByText(/Solicitud enviada correctamente/i)).toBeInTheDocument();
  });
});
