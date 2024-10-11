import {Router} from 'express'
import { info, verCategoria } from '../mysql/mysql.js'

const categoria = Router()

categoria.get('/', async(req, res)=>{

    const [categoriaUno] = await verCategoria()

    return res.send(categoriaUno)
})

export default categoria