import React, { useEffect, useState } from 'react'
import { useForm } from '../helpers/useForm'
import { useValidar } from '../helpers/useValidar'
import { useUsuario } from '../helpers/useUsuario'
import { useRegister } from '../helpers/useRegister'
import { Link, NavLink } from 'react-router-dom'
import "../styles/sesion.css"

export const SesionApp = () => {
    const {registrar} = useRegister()

    const [formulario, setFormulario] = useState()

    const {conUsuario, confirmarCorreo} = useUsuario()

    //Recibir formulario
    const { nombre, correo, pass, conPass, formState, onInputChange, setFormState } = useForm()
    //Validar clave principal
    const {validarClave, compararClaves, validarForm} = useValidar(formState)
    const [validarClavePrincipal, setValidarClavePrincipal] = useState(false)

    //Comparar claves
    const [compararValidacion, setCompararValidacion] = useState(false)

    //Validar formulario
    const [formularioResult, setFormularioResult] = useState(false)

    const verClick = (e) => {
        const input = e.target.parentNode.children[1];
        if (input.type == 'password') {
            input.type = 'text'
        } else {
            input.type = 'password'
        }
    }

    useEffect(() => {
        setValidarClavePrincipal(validarClave(formState))
        setCompararValidacion(compararClaves())
        setFormularioResult(validarForm())

        if(formState.correo) conUsuario(formState.correo)
    }, [formState])    

    const enviar = async(e) => {
        e.preventDefault()
        if(validarClavePrincipal && compararValidacion && formularioResult && confirmarCorreo){
            await registrar(formState)
            setFormulario({mensaje:true})
            window.location.href = '/sesion'
        }
        else setFormulario({mensaje:false})
    }

    return (
        <>
            <form action="" onSubmit={enviar} className='form_input'>
                <div className="logo_titulo">
                    <Link to="/"><img className='logo' src="../src/images/F.png" alt="" /></Link>
                    <h2>Registrarse</h2>
                </div>

                <div className="inputs">
                    <div className="cont_input">
                        <label htmlFor="usuario">Nombre de usuario</label>
                        <input onChange={onInputChange} name='nombre' type="text" id='usuario' placeholder='Nombre de usuario' value={nombre}/>
                    </div>
                    <div className="cont_input">
                        <label htmlFor="correo">Correo</label>
                        <input onChange={onInputChange} name='correo' type="email" id='correo' placeholder='Correo' value={correo}/>
                    </div>
                    
                    {(formState.correo && !confirmarCorreo) && (<div className="error">Correo en uso</div>)}

                    <div className="cont_input pass">
                        <label htmlFor="pass">Contraseña</label>
                        <input onChange={onInputChange} name='pass' type="password" id='pass' placeholder='Contraseña' value={pass}/>
                        <i onClick={verClick} className="fa-solid fa-eye"></i>
                    </div>

                    {(formState.pass && !validarClavePrincipal) && (<div className='error'>Debe contener al menos 8 caracteres, un digito, una letra mayúscula, una minúscla y al menos un caracter especial</div>)}

                    <div className="cont_input pass">
                        <label htmlFor="conPass">Confirmar Contraseña</label>
                        <input onChange={onInputChange} name='conPass' type="password" id='conPass' placeholder='Contraseña' value={conPass} />
                        <i onClick={verClick} className="fa-solid fa-eye"></i>
                    </div>

                    {(formState.conPass && !compararValidacion) && (<div className='error'>Las contraseñas deben ser iguales</div>)}
                    
                    {(formulario && !formulario.mensaje)  && (<div className="error">Se debe rellenar todos los campos, el nombre de usuario debe tener entre 3 y 16 caracteres y el correo debe ser válido</div>)}
                </div>
                <Link to="/sesion" className='cuenta'>¡Ya tienes cuenta! - Iniciar Sesión</Link>

                <button className='btn'>Registrar</button>
            </form>

            <img src="https://i.gifer.com/g32K.gif" className='gif' alt="" />
        </>
    )
}
