import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import registrarApp from './routes/registrar.js'
import verUsuarios from './routes/verUsuarios.js'
import sesionApp from './routes/sesion.js'
import subir from './routes/subir.js'
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url'
import publicaciones from './routes/publicaciones.js'
import obusuarios from './routes/usuarios.js'
import categoria from './routes/categoria.js'
import favoritoApp from './routes/favorito.js'
import seguir from './routes/seguir.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const folderPath = path.join(__dirname, 'images/perfil', 'UrsH5yLq5T3F0Kk58asUD.png')

// console.log(folderPath);

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 80

app.use('/registrar', registrarApp)
app.use('/sesion', sesionApp)
app.use('/usuarios', verUsuarios)
app.use('/verusuarios', obusuarios)
app.use('/subir', subir)
app.use('/publicaciones', publicaciones)
app.use('/categoria', categoria)
app.use('/favorito', favoritoApp)
app.use('/seguir', seguir)

app.get('/archivo/:nombre', (req, res) => {
    const nombreArchivo = req.params.nombre;
    const rutaArchivo = path.join(__dirname, 'images/publicaciones', nombreArchivo);
    res.sendFile(rutaArchivo);
  });
  
app.get('/perfil/:nombre', (req, res) => {
    const nombreArchivo = req.params.nombre;
    const rutaArchivo = path.join(__dirname, 'images/perfil', nombreArchivo);
    res.sendFile(rutaArchivo);
  });
  

app.listen(PORT, ()=> console.log(`Servidor abierto en el puerto ${PORT}`))

