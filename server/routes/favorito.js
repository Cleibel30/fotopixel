import {Router} from 'express'
import { info, addFavorito, verFavoritos, quitarFavoritos } from '../mysql/mysql.js'

const favoritoApp = Router()

favoritoApp.post('/', async(req, res)=>{
    const {id_publicacion, id_usuario} = req.body
    addFavorito(id_publicacion, id_usuario)
    res.send({mensaje: true})
})

favoritoApp.get('/verFavorito', async(req, res)=>{
    const [favoritos] = await verFavoritos()
    console.log(favoritos)
    res.send(favoritos)
})

favoritoApp.delete('/quitar', async(req, res)=>{
    const {id} = req.body
    quitarFavoritos(id)
    res.send({mensaje: true})
})

export default favoritoApp