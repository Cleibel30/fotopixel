import { pool } from "./conexionMySQL.js";

export const info = async()=>{
    try{
        const result = await pool.query('SELECT * FROM usuarios;')
        return result
    }catch(err){
        console.err(err)
    }
}

export const verSesiones = async()=>{
    try{
        const result = await pool.query('SELECT * FROM sesiones;')
        return result
    }catch(err){
        console.err(err)
    }
}

export const verCategoria = async()=>{
    try{
        const result = await pool.query('SELECT * FROM categoria;')
        return result
    }catch(err){
        console.err(err)
    }
}

export const verFavoritos = async()=>{
    try{
        const result = await pool.query('SELECT * FROM favoritos;')
        return result
    }catch(err){
        console.err(err)
    }
}
export const quitarFavoritos = async(id)=>{
    try{
        const result = await pool.query(`delete FROM favoritos where id_favorito = ${id};`)
        return result
    }catch(err){
        console.err(err)
    }
}

export const verPublicaciones = async()=>{
    try{
        const result = await pool.query('SELECT p.id_publicacion, p.id_usuario, p.fecha, p.titulo, p.ruta, p.id_categoria, u.nombre_usuario, u.correo, u.foto FROM publicaciones p inner join usuarios u ON p.id_usuario = u.id_usuario;')
        return result
    }catch(err){
        console.err(err)
    }
}

export const addSesion = async(sesion, id_usuario)=>{
    try{
        const result = await pool.query('INSERT INTO sesiones (sesion, id_usuario)'
                                        + 'VALUES (?,?)', [sesion, id_usuario])
        console.log(result)
        console.log("Añadido")
    }catch(err){
        console.err(err)
    }
}


export const addUser = async(nombre_usuario, correo, clave)=>{
    try{
        const result = await pool.query('INSERT INTO usuarios (nombre_usuario, correo, clave, foto)'
                                        + 'VALUES (?,?,?,?)', [nombre_usuario, correo, clave, 'perfil.png'])
        console.log(result)
        console.log("Añadido")
    }catch(err){
        console.err(err)
    }
}

export const addPublicaciones = async(id_usuario, titulo, id_categoria, fecha, ruta)=>{
    try{
        const result = await pool.query('INSERT INTO publicaciones (id_usuario, titulo, id_categoria, fecha, ruta)'
                                        + 'VALUES (?,?,?,?,?)', [id_usuario, titulo, id_categoria, fecha, ruta])
        console.log(result)
        console.log("Añadido")
    }catch(err){
        console.log(err)
    }
}
export const addFavorito = async(id_publicacion, id_usuario)=>{
    try{
        const result = await pool.query('INSERT INTO favoritos (id_publicacion, id_usuario)'
                                        + 'VALUES (?,?)', [id_publicacion, id_usuario])
        console.log(result)
        console.log("Añadido")
    }catch(err){
        console.log(err)
    }
}
export const addSeguir = async(id_siguiendo, id_usuario)=>{
    try{
        const result = await pool.query('INSERT INTO seguidores (id_siguiendo, id_usuario)'
                                        + 'VALUES (?,?)', [id_siguiendo, id_usuario])
        console.log(result)
        console.log("Añadido")
    }catch(err){
        console.log(err)
    }
}

export const quitarSeguidor = async(id)=>{
    try{
        const result = await pool.query(`delete FROM seguidores where id_seguidor = ${id};`)
        return result
    }catch(err){
        console.err(err)
    }
}

export const verSeguidores = async()=>{
    try{
        const result = await pool.query('SELECT * FROM seguidores;')
        return result
    }catch(err){
        console.err(err)
    }
}