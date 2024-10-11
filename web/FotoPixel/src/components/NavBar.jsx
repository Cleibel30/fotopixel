import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { UsuariosContext } from '../context/UsuariosContext';

export const NavBar = ({ info }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [verOpciones, setverOpciones] = useState(false)
    const nav_menu = [{ url: '/', link: 'Inicio' }, { url: '/crear', link: 'Crear' }]
    const {setUsuario,usuario} = useContext(UsuariosContext)
    const {nombre_usuario, correo, foto} = usuario
    const cerrarSesion = ()=>{
        removeCookie('usuario', { path: '/' })
        setUsuario({})
    }

    const clickVer = ()=>{
        if(verOpciones) setverOpciones(false)
        else setverOpciones(true)
    }

    return (
        <header className='header'>
            <nav className='nav'>
                <div className="cont">
                    <NavLink to="/"><img className='logo' src="../src/images/F.png" alt="" /></NavLink>
                    <ul className='menu_nav'>
                        {nav_menu.map(item => (

                            <li className='item' key={item.link}>
                                <NavLink to={item.url} id={(item.link.toLowerCase() == info) && 'active_btn'} className='link'>{item.link}</NavLink>
                            </li>

                        ))}
                    </ul>
                </div>

                <form action="" className='form_search'>
                    <button className='btn_search'><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input type="search" placeholder='Buscar' />
                </form>

                {(nombre_usuario && foto && correo)  ?
                    (<div className="usuario" onClick={clickVer}>
                        <div className="perfil_usuario">
                            <p className="nombre_usuario">{nombre_usuario}</p>
                            <img src={`http://localhost:80/perfil/${foto}`} alt="usuario" className='img_perfil' />
                        </div>
                        {verOpciones && (<div className="opciones">
                            <Link className='item_perfil' to={`/perfil/${correo}`}>Ver perfil <i className="fa-solid fa-user"></i></Link>
                            <Link className='item_perfil' to='/' onClick={cerrarSesion}>Cerrar sesión <i className="fa-solid fa-door-open"></i></Link>
                        </div>)}
                    </div>)

                    :

                    (<Link className='btn_link' to="/sesion">Iniciar Sesión</Link>)}

            </nav>
        </header>
    )
}
