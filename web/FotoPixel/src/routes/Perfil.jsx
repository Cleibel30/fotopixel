import React, { useContext, useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { Videos } from '../components/Videos'
import { UsuariosContext } from '../context/UsuariosContext'
import { useInfoPubli } from '../helpers/useInfoPubli'
import { useParams } from 'react-router-dom';
import { useSeguir } from '../helpers/useSeguir'


export const Perfil = () => {
    const { setUsuario, usuario } = useContext(UsuariosContext)
    const [arrayPubli, setArrayPubli] = useState([])
    // const { infoPubli } = useInfoPubli()
    const [perfil, setPerfil] = useState({})
    const { nombre_usuario, correo, foto } = perfil
    const { id } = useParams()
    const {seguir, verSeguidores, quitarSeguidor, arraySeguidores} = useSeguir()

    useEffect(() => {
        fetch('http://localhost:80/publicaciones')
            .then(response => {
                return response.json()
            })
            .then(data => {
                const arrayInfo = data.filter(item => item.correo == id)
                setArrayPubli(arrayInfo)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:80/verusuarios/${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.nombre_usuario){
                    setPerfil(data)
                }else setPerfil({})
            })
    }, [])

    useEffect(() => {
      verSeguidores()
    }, [])

    const seguirVer = arraySeguidores.find(item => item.id_usuario == usuario.id_usuario)
    const seguidoresCantidad = arraySeguidores.filter(item => item.id_siguiendo == perfil.id_usuario)
    console.log(seguidoresCantidad)

    const seguirBtn = ()=>{
        window.location.href = `/perfil/${perfil.correo}`
        if(seguirVer){
            quitarSeguidor(seguirVer.id_seguidor)
        }else seguir(perfil.id_usuario, usuario.id_usuario)
    }


    console.log(seguirVer)

    return (
        <>
            <NavBar info={[]}></NavBar>
            <div className="box">
                <div className="usuario_cont">
                    <img src={`http://localhost:80/perfil/${foto}`} alt="usuario" className='perfil_pagina' />
                    <p className="nombre_usuario_cont">{nombre_usuario}</p>
                    <div className="datos">
                    <button>Seguidores: {seguidoresCantidad.length}</button>
    
                        {id == usuario.correo && (<button>Cambiar Foto de Perfil <i className="fa-solid fa-wand-magic-sparkles"></i></button>)}
                        {(id != usuario.correo && usuario.nombre_usuario) && (<button onClick={seguirBtn}>{!seguirVer ? 'Seguir' : 'Siguiendo'}</button>)}
                    </div>
                </div>
            </div>

            <div className="container_perfil">
                <Videos publicaciones={arrayPubli} id="video_perfil"></Videos>
            </div>
        </>
    )
}
