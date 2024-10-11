import { Router } from 'express'
import { info, verSesiones, addSesion } from '../mysql/mysql.js'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'
import { claveHash } from '../helpers/hashClave.js'

const sesionApp = Router()

sesionApp.post('/', async (req, res) => {
    const { correo, clave } = req.body

    if (!correo || !clave) return res.status(403).send({ mensaje: false })
    try {
        const [usuarios] = await info()

        const usuario = usuarios.find(user => user.correo === correo)

        if (!usuario) return res.status(403).send({ mensaje: false })

        const verficar = await claveHash(clave, usuario.clave)

        if (!verficar) return res.status(403).send({ mensaje: false })

        const sessionId = nanoid()

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
        })

        addSesion(sessionId, usuario.id_usuario)

        return res.send({ mensaje: true, session: sessionId })
    } catch (err) {
        return res.status(403).send({ mensaje: err })
    }
})

sesionApp.get('/usuario/:cookie', async (req, res) => {
    const { cookie } = req.params

    if (!cookie) return res.status(403).send({ mensaje: false })


    const [sesiones] = await verSesiones()
    const sesion = sesiones.find(sesion => sesion.sesion == cookie)
    if (!sesion) return res.status(403).send({ mensaje: false })
    const [usuarios] = await info()
    const usuario = usuarios.find(usuario => usuario.id_usuario == sesion.id_usuario)
    if (!sesion) return res.status(403).send({ mensaje: false })
    
    delete usuario.clave

    return res.send(usuario)
})

export default sesionApp