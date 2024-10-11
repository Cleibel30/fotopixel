import { Router } from 'express'
import { addUser, info } from '../mysql/mysql.js'
import bcrypt from 'bcryptjs'

const registrarApp = Router()

registrarApp.post('/', async (req, res) => {
    const { nombre_usuario, correo, clave } = req.body

    if (!nombre_usuario || !correo || !clave) return res.status(403).send({ mensaje: 'No permitido' })


    const [usuarios] = await info()

    const usuario = usuarios.find(user => user.correo === correo)

    if (usuario) return res.status(403).send({ mensaje: false })

    const saltRounds = 10

    bcrypt.hash(clave, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hasheando la contraseña:', err);
        } else {
            addUser(nombre_usuario, correo, hashedPassword)
        }
    });

    res.send()
})

export default registrarApp