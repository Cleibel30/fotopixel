import React, { useState } from 'react'

export const useUsuario = () => {
    const [confirmarCorreo, setConfirmarCorreo] = useState()
    const conUsuario = async(usuario)=>{
        try{
            const response = await fetch(`http://localhost/usuarios/${usuario}`)
            const json = await response.json()

            setConfirmarCorreo(json.mensaje)
        }catch(error){
            console.error(error)
        }
    }
  return {
    conUsuario,
    confirmarCorreo
  }
}
