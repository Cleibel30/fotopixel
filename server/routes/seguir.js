import { Router } from 'express'
import { info, addSeguir, quitarSeguidor, verSeguidores } from '../mysql/mysql.js'

const seguirApp = Router()

seguirApp.post('/', async (req, res) => {
    const { id_siguiendo, id_usuario } = req.body
    addSeguir(id_siguiendo, id_usuario)
    const [seguidores] = await verSeguidores()
    res.send(seguidores)
})

seguirApp.get('/verSeguidores', async(req, res)=>{
    const [seguidores] = await verSeguidores()
    console.log(seguidores)
    res.send(seguidores)
})

seguirApp.delete('/quitar', async(req, res)=>{
    const {id} = req.body
    quitarSeguidor(id)
    const [seguidores] = await verSeguidores()
    res.send(seguidores)
})

export default seguirApp