import { Router } from "express";
import { verPublicaciones } from '../mysql/mysql.js'

const publicaciones = Router()

publicaciones.get("/", async(req, res)=>{
    const [publicaciones] = await verPublicaciones()
    res.send(publicaciones)
})

export default publicaciones