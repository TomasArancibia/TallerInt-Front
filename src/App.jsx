import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Homepage from './Homepage'
import ProcesosClinicos from './ProcesosClinicos'
import SeguridadAsistencial from './SeguridadAsistencial'
import InfoAdministrativa from './InfoAdministrativa'
import InfoVisitas from './InfoVisitas'
import NutricionAlimentacion from './NutricionAlimentacion'
import Limpieza from './Limpieza'
import Mantencion from './Mantencion'
import BeneficiosSociales from './BeneficiosSociales'
import AcompañamientoEspiritual from './AcompañamientoEspititual'
import SegurosConvenios from './SegurosConvenios'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/procesosclinicos" element={<ProcesosClinicos />} />
        <Route path="/seguridad_asistencial" element={<SeguridadAsistencial />} />
        <Route path="/info_administrativa" element={<InfoAdministrativa />} />
        <Route path="/info_visitas" element={<InfoVisitas />} />
        <Route path="/nutricion_y_alimentacion" element={<NutricionAlimentacion />} />
        <Route path="/limpieza" element={<Limpieza />} />
        <Route path="/mantencion" element={<Mantencion />} />
        <Route path="/beneficios_sociales" element={<BeneficiosSociales />} />
        <Route path="/acompañamiento_espiritual" element={<AcompañamientoEspiritual />} />
        <Route path="/seguros_convenios" element={<SegurosConvenios />} />
      </Routes>
    </Router>
  )
}

export default App
