import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Homepage from './Homepage'
import ProcesosClinicos from './ProcesosClinicos'
import SeguridadAsistencial from './SeguridadAsistencial'
import InfoAdministrativa from './InfoAdministrativa'
import InfoVisitas from './InfoVisitas'
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
      </Routes>
    </Router>
  )
}

export default App
