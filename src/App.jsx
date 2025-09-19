import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";

// Info
import InfoAdministrativa from "./pages/Info/InfoAdministrativa/InfoAdministrativa.jsx";
import BeneficiosSociales from "./pages/Info/InfoAdministrativa/BeneficiosSociales.jsx";
import SegurosConvenios from "./pages/Info/InfoAdministrativa/SegurosConvenios.jsx";
import ProcesosClinicos from "./pages/Info/InfoClinica/ProcesosClinicos.jsx";
import InfoVisitas from "./pages/Info/InfoVisitas/InfoVisitas.jsx";

// Solicitudes
import AcompanamientoEspiritual from "./pages/Solicitudes/AcompanamientoEspiritual/AcompanamientoEspiritual.jsx";
import AsistenciaSocial from "./pages/Solicitudes/AsistenciaSocial/AsistenciaSocial.jsx";
import Limpieza from "./pages/Solicitudes/Limpieza/Limpieza.jsx";
import Mantencion from "./pages/Solicitudes/Mantencion/Mantencion.jsx";
import Nutricion from "./pages/Solicitudes/Nutricion/Nutricion.jsx";

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
        <Route path="/beneficios_sociales" element={<BeneficiosSociales />} />
        <Route path="/acompanamiento_espiritual" element={<AcompanamientoEspiritual />} />
        <Route path="/asistencia_social" element={<AsistenciaSocial />} />
        <Route path="/seguros_convenios" element={<SegurosConvenios />} />
      </Routes>
    </Router>
  );
}

export default App;

