import {Router} from 'express'
import { info } from '../mysql/mysql.js'

const obusuarios = Router()

obusuarios.get('/:correo', async(req, res)=>{
    const {correo} = req.params
    const [usuarios] = await info()
    const usuario = await usuarios.find(usuario => usuario.correo == correo)
    if(!usuario) return res.status(403).send({mensaje: false})
    delete usuario.clave
    return res.send(usuario)

    return res.send({mensaje: true})
})

export default obusuarios