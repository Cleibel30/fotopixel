import React, { useState } from 'react'

export const useFavorito = () => {
  const [arrayFavoritos, setArrayFavoritos] = useState([])
    const favorito = (id_publicacion, id_usuario)=>{
        const objetoFavorito = {id_publicacion, id_usuario}
        fetch('http://localhost:80/favorito', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objetoFavorito)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
    }

    const verFavorito = ()=>{
      fetch('http://localhost:80/favorito/verFavorito')
      .then(response => response.json())
      .then(data => {
          setArrayFavoritos(data)
      })
      .catch(error => console.error('Error:', error))
    }

    const quitarFavorito = (id)=>{
      const objetoFavorito = {id}
      fetch('http://localhost:80/favorito/quitar', {
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
        favorito,
        verFavorito,
        quitarFavorito,
        arrayFavoritos
  }
}
