import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";

// INFO

// Info Procesos clinicos
import ProcesosClinicos from "./pages/Info/InfoClinica/ProcesosClinicos.jsx";

// Info administrativa
import InfoAdministrativa from "./pages/Info/InfoAdministrativa/InfoAdministrativa.jsx";
import BeneficiosSociales from "./pages/Info/InfoAdministrativa/BeneficiosSociales.jsx";
import SegurosConvenios from "./pages/Info/InfoAdministrativa/SegurosConvenios.jsx";


// Info visitas
import InfoVisitas from "./pages/Info/InfoVisitas/InfoVisitas.jsx";

// SOLICITUDES
// Mantencion
import Mantencion from "./pages/Solicitudes/Mantencion/Mantencion.jsx";
import SolicitudMantencion from "./pages/Solicitudes/Mantencion/SolicitudMantencion.jsx";

// Nutricion y alimentacion
import Nutricion from "./pages/Solicitudes/Nutricion/Nutricion.jsx";

// Limpieza
import Limpieza from "./pages/Solicitudes/Limpieza/Limpieza.jsx";

// Asistencia social
import AsistenciaSocial from "./pages/Solicitudes/AsistenciaSocial/AsistenciaSocial.jsx";

// Acompanamiento espiritual
import AcompanamientoEspiritual from "./pages/Solicitudes/AcompanamientoEspiritual/AcompanamientoEspiritual.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/procesosclinicos" element={<ProcesosClinicos />} />
        <Route path="/info_administrativa" element={<InfoAdministrativa />} />
        <Route path="/info_visitas" element={<InfoVisitas />} />
        <Route path="/nutricion_y_alimentacion" element={<Nutricion />} />
        <Route path="/limpieza" element={<Limpieza />} />
        <Route path="/mantencion" element={<Mantencion />} />
        <Route path="/solicitudmantencion" element={<SolicitudMantencion />} />
        <Route path="/beneficios_sociales" element={<BeneficiosSociales />} />
        <Route path="/acompanamiento_espiritual" element={<AcompanamientoEspiritual />} />
        <Route path="/asistencia_social" element={<AsistenciaSocial />} />
        <Route path="/seguros_convenios" element={<SegurosConvenios />} />
      </Routes>
    </Router>
  );
}

export default App;

