import { SesionApp } from "./routes/SesionApp"
import { InicioSesion } from "./routes/InicioSesion"
import { Inicio } from "./routes/Inicio"
import { Routes, Route, Navigate  } from 'react-router-dom'
import { UsuarioProvider } from './context/UsuarioProvider'
import { Perfil } from "./routes/Perfil"
import { useContext } from "react"
import { Subir } from "./routes/Subir"
import { Fotos } from "./routes/Fotos"


function App() {
  return (
    <>
      <UsuarioProvider>
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/registrar" element={<SesionApp></SesionApp>}></Route>
            <Route path="/sesion" element={<InicioSesion></InicioSesion>}></Route>
            <Route path="/crear" element={<Subir></Subir>}></Route>
            <Route path="/perfil/:id" element={<Perfil></Perfil>}></Route>
            <Route path="/foto/:id" element={<Fotos></Fotos>}></Route>
            <Route path='/*' element={<Navigate to="/"></Navigate>}></Route>
          </Routes>
      </UsuarioProvider>
    </>
  )
}

export default App
