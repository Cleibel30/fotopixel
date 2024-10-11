import {Router} from 'express'
import { info } from '../mysql/mysql.js'

const registrarApp = Router()

registrarApp.get('/:correo', async(req, res)=>{
    const {correo} = req.params
    const [usuarios] = await info()
    const usuario = await usuarios.find(usuario => usuario.correo == correo)
    
    if(usuario) return res.status(403).send({mensaje: false})

    return res.send({mensaje: true})
})

export default registrarApp