import React, { useContext, useState } from 'react'
import { NavBar } from '../components/NavBar'
import { useForm } from '../helpers/useForm'
import { useSubirImagen } from '../helpers/useSubirImagen'
import { UsuariosContext } from '../context/UsuariosContext'


export const Subir = () => {
    const { formState, onInputChange } = useForm()
    const { subirImg } = useSubirImagen()
    const [file, setFile] = useState(null);
    const [categoria, setCategoria] = useState(null)
    const [data, setdata] = useState({mensaje: null})
    const [imagen, setimagen] = useState(null)
    const { setUsuario, usuario } = useContext(UsuariosContext)
    const { nombre_usuario, correo, foto } = usuario
    console.log(usuario)

    const subir = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        formData.append('titulo', formState.nombre)
        formData.append('categoria', categoria)
        formData.append('id_usuario', usuario.id_usuario)


        if (formState.nombre && categoria && formData && usuario.id_usuario) {
            subirImg(formData)
            setdata({mensaje: true})
            window.location.href = '/'
        } else setdata({mensaje: false})
    }

    const subirImagen = (e) => {
        setFile(e.target.files[0])
        const img = e.target.files[0]
        if (img) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setimagen(e.target.result)
            }

            reader.readAsDataURL(img)
        }
    }

    const categoriaClick = (e) => {
        const btn = e.target

        if (btn.nodeName === "BUTTON") {

            if (btn.name == categoria) {
                btn.className = 'active_btn'
                setCategoria(null)
            } else {
                setCategoria(btn.name)

                const hijos = e.target.parentNode.children
                if (categoria) {
                    for (const hijo of hijos) {
                        if (hijo.className == 'btn') {
                            hijo.className = 'active_btn'
                        }
                    }
                }

                btn.className = "btn"
            }

        }
    }

    console.log(categoria)

    return (
        <>

            <NavBar info='crear'></NavBar>

            <div className="cont cont_subir">
                {!(nombre_usuario && correo && foto) ?
                    (<div className="cont">
                        <h2>Para subir una imagen tienes que iniciar sesión</h2>
                    </div>)
                    :

                    (<form action="" onSubmit={subir}>
                        <div className="subir">
                            <label htmlFor="file"><i className="fa-solid fa-arrow-up-from-bracket"></i></label>
                            <input onChange={subirImagen} type="file" id='file' accept="image/*" />
                        </div>

                        {imagen && (<img className='img' src={imagen} alt="" />)}

                        <div className="cont_input">
                            <label htmlFor="titulo">Ingresa el título de la imagen</label>
                            <input name='nombre' type="text" id='titulo' placeholder='Título de la imagen' onChange={onInputChange} />
                        </div>

                        <div className="btn_cont" onClick={categoriaClick}>
                            <button type='button' className='active_btn' name='1'>Naturaleza</button>
                            <button type='button' className='active_btn' name='2'>Deportes</button>
                            <button type='button' className='active_btn' name='3'>Arte y creatividad</button>
                            <button type='button' className='active_btn' name='4'>Películas y series</button>
                            <button type='button' className='active_btn' name='5'>Animales</button>
                            <button type='button' className='active_btn' name='6'>Gastronomía</button>
                            <button type='button' className='active_btn' name='7'>Moda</button>
                        </div>

                        {(data.mensaje != null && !data.mensaje) && (<div className="error margen">Rellena todos los campos</div>)}

                        <button type='submit' className='btn btn_subir'>Subir imagen <i className="fa-solid fa-plus"></i></button>
                    </form>)
                }

            </div>
        </>
    )
}
