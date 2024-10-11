import React from 'react'

export const useSubirImagen = () => {
    const subirImg = async(datos) => {
        try {
            const response = await fetch('http://localhost:80/subir', {
                method: 'POST',
                body: datos,
            });
            const result = await response.text();
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }

        console.log(datos)
    }
    return {
        subirImg
    }
}
