import React, { useState } from 'react'

export const useRegister = () => {
    const [verificarRegistro, setverificarRegistro] = useState()
     
    const registrar = async (objeto) => {
        const datos = {
            nombre_usuario: objeto.nombre,
            correo: objeto.correo,
            clave: objeto.pass
        }
        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        }

        try {
            const response = await fetch('http://localhost:80/registrar', opciones)
            const json = await response.json()
            console.log(json)
        }catch(e){
            console.log(e)
        }

    }
    return {
        registrar,
        verificarRegistro
    }
}
