import React, { useContext, useEffect } from 'react'
import { NavBar } from '../components/NavBar'
import { Link, NavLink } from 'react-router-dom'
import '../styles/general.css'
import { Videos } from '../components/Videos'
import { UsuariosContext } from '../context/UsuariosContext'
import { useInfoPubli } from '../helpers/useInfoPubli'
import { useState } from 'react'

export const Inicio = () => {
  const { setUsuario, usuario } = useContext(UsuariosContext)
  const [arrayPubli, setArrayPubli] = useState([])
  const { infoPubli } = useInfoPubli()
  
  useEffect(() => {
    infoPubli()
    .then(resultado =>{
      setArrayPubli(resultado)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])

  console.log(arrayPubli)
  
  return (
    <>
      <NavBar info='inicio'></NavBar>
      <Videos publicaciones={arrayPubli}></Videos>
    </>
  )
}
