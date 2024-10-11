import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { NavBar } from '../components/NavBar'
import { Link, NavLink } from 'react-router-dom'
import '../styles/general.css'
import { Videos } from '../components/Videos'
import { UsuariosContext } from '../context/UsuariosContext'
import { useInfoPubli } from '../helpers/useInfoPubli'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFavorito } from '../helpers/useFavorito'
import { useNavigate } from 'react-router-dom'


export const Fotos = () => {
    const navigate = useNavigate()
    const { setUsuario, usuario } = useContext(UsuariosContext)
    const [arrayPubli, setArrayPubli] = useState([])
    const [publicacion, setPublicacion] = useState([])
    const { infoPubli } = useInfoPubli()
    const { favorito, verFavorito, arrayFavoritos, quitarFavorito } = useFavorito()
    const [click, setClick] = useState(0)
    const [objFav, setobjFav] = useState(null)

    const { nombre_usuario, ruta, correo, foto, id_categoria } = arrayPubli
    const { id } = useParams()

    useEffect(() => {
        infoPubli()
            .then(resultado => {
                const publicacion = resultado.find(item => item.ruta == id)
                setArrayPubli(publicacion)

                setPublicacion(resultado)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const quitar = publicacion.filter(item => (item.ruta != id))

    const descargar = async () => {
        fetch(`http://localhost:80/archivo/${id}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', id);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            }).catch(error => console.error('Error downloading the file:', error));
    }


    const corazon = (e) => {
        if (nombre_usuario) {
            const btn = e.target

            if (btn.id == "activo") {
                btn.id = " "
            } else btn.id = "activo"
        }
    }

    useEffect(() => {
        verFavorito()
    }, [])

    const fav = arrayFavoritos.find(item => item.id_publicacion == arrayPubli.id_publicacion && item.id_usuario == arrayPubli.id_usuario)

    const addFavorito = () => {
        window.location.href = `/foto/${id}`
        setClick(click + 1)
        if (!fav) {
            favorito(arrayPubli.id_publicacion, usuario.id_usuario)
            
        } else {
            quitarFavorito(fav.id_favorito)
        }
    }

    console.log(fav)

    return (
        <>
            <NavBar info='inicio'></NavBar>
            <div className="container">
                <div className="foto_container">
                    <header className='foto_container_perfil'>
                        <div className='container_foto'>
                            <Link to={`/perfil/${correo}`} className='link_perfil'>
                                <img src={`http://localhost:80/perfil/${foto}`} alt="" />
                                <p>{nombre_usuario}</p>
                            </Link>

                        </div>
                        <div className="container_btn">
                            <button className='guardar' id='' onClick={(e) => {
                                corazon(e)
                                addFavorito()
                            }}>
                                <i className="fa-solid fa-heart" id={fav ? 'activo' : undefined}></i>
                            </button>
                            <button onClick={descargar} className='btn'>Descargar</button>
                        </div>
                    </header>
                    <div className="titulo"><h3>{arrayPubli.titulo}</h3></div>
                    <div className="cont_foto">
                        <img className='foto' src={`http://localhost:80/archivo/${id}`} alt="" />
                    </div>
                </div>


            </div>


            <div className="abajo">
                <h2>Más publicaciones</h2>
                <Videos publicaciones={quitar} id="video_perfil"></Videos>
            </div>
        </>
    )
}
