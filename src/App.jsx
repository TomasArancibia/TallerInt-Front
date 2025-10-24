import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Landing from "./pages/Landing.jsx";  

// INFO

// Info Procesos clinicos
import ProcesosClinicos from "./pages/Info/InfoClinica/ProcesosClinicos.jsx";

// Info administrativa
import InfoAdministrativa from "./pages/Info/InfoAdministrativa/InfoAdministrativa.jsx";
import BeneficiosSociales from "./pages/Info/InfoAdministrativa/BeneficiosSociales.jsx";
import SegurosConvenios from "./pages/Info/InfoAdministrativa/SegurosConvenios.jsx";


// Info visitas
import InfoVisitas from "./pages/Info/InfoVisitas/InfoVisitas.jsx";

// Subpaginas Info General Visitas
import InfoGeneralVisita from "./pages/Info/InfoVisitas/InfoGeneralVisitas/InfoGeneralVisita.jsx";
import InfoDifVisAco from "./pages/Info/InfoVisitas/InfoGeneralVisitas/InfoDifVisAco.jsx";
import InfoRolResp from "./pages/Info/InfoVisitas/InfoGeneralVisitas/InfoRolResp.jsx";
import InfoRolPagare from "./pages/Info/InfoVisitas/InfoGeneralVisitas/InfoRolPagare.jsx";

// Subpaginas Info Horarios y Condiciones
import InfoHorariosCon from "./pages/Info/InfoVisitas/InfoHorariosCon/InfoHorariosCon.jsx";
import InfoHoriariosVisitas from "./pages/Info/InfoVisitas/InfoHorariosCon/InfoHorariosVisitas.jsx";
import InfoHorariosEntrada from "./pages/Info/InfoVisitas/InfoHorariosCon/InfoHoriosEntrada.jsx";

// Subpaginas Info Servicios para visitas
import InfoServiciosVisitas from "./pages/Info/InfoVisitas/InfoServiciosVisitas/InfoServiciosVisitas.jsx";
import InfoComida from "./pages/Info/InfoVisitas/InfoServiciosVisitas/InfoServiciosComida.jsx";
import InfoReflexion from "./pages/Info/InfoVisitas/InfoServiciosVisitas/InfoServicioReflexion.jsx";
import InfoInstalaciones from "./pages/Info/InfoVisitas/InfoServiciosVisitas/InfoServiciosInstalaciones.jsx";
import Chatbot from "./pages/Chatbot.jsx";


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
        <Route path="/landing" element={<Landing />} />
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
        <Route path="/info_general_visitas" element={<InfoGeneralVisita />} />
        <Route path="/info_dif_vis_aco" element={<InfoDifVisAco />} />
        <Route path="/info_rol_resp" element={<InfoRolResp />} />
        <Route path="/info_rol_pagare" element={<InfoRolPagare />} />
        <Route path="/info_horarios_condiciones" element={<InfoHorariosCon />} />
        <Route path="/info_horarios_visitas" element={<InfoHoriariosVisitas />} />
        <Route path="/info_horarios_entrada" element={<InfoHorariosEntrada />} />
        <Route path="/info_servicios_visitas" element={<InfoServiciosVisitas />} />
        <Route path="/info_comida" element={<InfoComida />} />
        <Route path="/info_reflexion" element={<InfoReflexion />} />
        <Route path="/info_instalaciones" element={<InfoInstalaciones />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;

