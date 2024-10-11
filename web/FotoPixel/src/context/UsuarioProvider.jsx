import React, { useState } from 'react'
import { UsuariosContext } from './UsuariosContext'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie';


export const UsuarioProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const [usuario, setUsuario] = useState({})

    const perfil = async () => {
        try {
            const response = await fetch(`http://localhost:80/sesion/usuario/${cookies.usuario}`)
            const json = await response.json()
            setUsuario(json)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        perfil()
    }, [])

    return (
        <UsuariosContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuariosContext.Provider>
    )
}
