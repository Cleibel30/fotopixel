import React, { useState } from 'react'

export const useSeguir = () => {
    const [arraySeguidores, setArraySeguidores] = useState([])
    const seguir = (id_siguiendo, id_usuario)=>{
        const objetoFavorito = {id_siguiendo, id_usuario}
        fetch('http://localhost:80/seguir', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objetoFavorito)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
    }

    const verSeguidores = ()=>{
      fetch('http://localhost:80/seguir/verSeguidores')
      .then(response => response.json())
      .then(data => {
          setArraySeguidores(data)
      })
      .catch(error => console.error('Error:', error))
    }

    const quitarSeguidor = (id)=>{
      const objetoFavorito = {id}
      fetch('http://localhost:80/seguir/quitar', {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoFavorito)
      })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
    }
  return {
        seguir,
        verSeguidores,
        quitarSeguidor,
        arraySeguidores
  }
}
