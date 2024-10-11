import React from 'react'

export const useInfoPubli = () => {
    
    const infoPubli = async()=>{
        try{
            const response = await fetch('http://localhost:80/publicaciones')
            const data = await response.json()
            return data
        }catch(err){
            console.log(err)
        }
    }
  return {
    infoPubli
  }
}
