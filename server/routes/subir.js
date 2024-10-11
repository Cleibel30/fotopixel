import { Router } from 'express'
import { addUser, info, addPublicaciones } from '../mysql/mysql.js'
import { upload } from '../multer/multer.js'
import multer from 'multer'
import path from 'path'

const subir = Router()


subir.post('/', upload.single('file'), (req, res) => {
    const {titulo, categoria, id_usuario} = req.body
    const ruta = req.file.filename

    const fechaActual = new Date();
    addPublicaciones(id_usuario, titulo, categoria, fechaActual, ruta)
    console.log(id_usuario, titulo, categoria, fechaActual, ruta)
    res.send()
});

export default subir