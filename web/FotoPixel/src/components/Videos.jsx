import React from 'react'
import { Link, NavLink } from 'react-router-dom'
export const Videos = ({ id, publicaciones }) => {
    const enviarRuta = (e)=>{
        const ruta = e.target.parentNode.id
        window.location.href = `/foto/${ruta}`
    }
    return (
        <>
            <div className="container" id={id}>
                <div class="masonry">
                    {publicaciones.map(item => (
                        <div className="masonry-item" id={item.ruta} key={item.ruta} onClick={enviarRuta}>
                            <img src={`http://localhost:80/archivo/${item.ruta}`} alt="Imagen 1" />

                            <div className="perfil">
                                <img src={`http://localhost:80/perfil/${item.foto}`} alt="" className="perfil_img" />
                                <p>{item.nombre_usuario}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
