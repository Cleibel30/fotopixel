import React, { useEffect, useState } from 'react'

export const useSesion = () => {
    const [respuesta, setrespuesta] = useState()
    // const [sesionIniciada, setsesionIniciada] = useState(null)
    const sesion = async (objeto) => {
        const datos = {
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
            const response = await fetch('http://localhost:80/sesion', opciones)
            const json = await response.json()
            
            return json
            
        } catch (err) { console.error(err) }

    }
    return {
        sesion
    }
}
