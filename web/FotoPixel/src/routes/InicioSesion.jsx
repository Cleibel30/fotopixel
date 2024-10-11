import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "../styles/sesion.css"
import { useForm } from '../helpers/useForm'
import { useSesion } from '../helpers/useSesion'
import { useCookies } from 'react-cookie';


export const InicioSesion = () => {
    const { formState, onInputChange } = useForm()
    const { sesion } = useSesion()
    const [resultadoSesion, setresultadoSesion] = useState(true)
    const [formulario, setformulario] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const verClick = (e) => {
        const input = e.target.parentNode.children[1];
        if (input.type == 'password') {
            input.type = 'text'
        } else {
            input.type = 'password'
        }
    }


    const enviar = (e) => {
        e.preventDefault()

        if (formState.correo && formState.pass) {
            sesion(formState)
                .then((resultado) => {
                    if (resultado.session) {
                        setCookie('usuario', resultado.session, { path: '/' })
                        setresultadoSesion(resultado.mensaje)
                        window.location.href = '/'
                    } else setresultadoSesion(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <>
            <form action="" onSubmit={enviar} className='form_input'>
                <div className="logo_titulo">
                    <Link to="/"><img className='logo' src="../src/images/F.png" alt="" /></Link>
                    <h2>Iniciar Sesion</h2>
                </div>


                <div className="inputs">
                    <div className="cont_input">
                        <label htmlFor="correo">Correo</label>
                        <input onChange={onInputChange} name='correo' type="email" id='correo' placeholder='Ingresa tu correo' />
                    </div>
                </div>

                <div className="cont_input pass">
                    <label htmlFor="pass">Contraseña</label>
                    <input onChange={onInputChange} name='pass' type="password" id='pass' placeholder='Ingresa la contraseña' />
                    <i onClick={verClick} className="fa-solid fa-eye"></i>
                </div>
                <Link to="/registrar" className='cuenta'>¿No tienes cuenta? - Registrate</Link>

                {!resultadoSesion && (<div className="error">Verifica los datos</div>)}
                <button className='btn'>Iniciar Sesión</button>
            </form>

            <img src="https://i.gifer.com/5m5h.gif" className='gif' alt="" />
        </>
    )
}
