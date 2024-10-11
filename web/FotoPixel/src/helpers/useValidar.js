import React from 'react'
const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;

const nombre_usuario = /^[a-z0-9_-]{3,16}$/;
const validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

export const useValidar = ({nombre, pass, conPass, correo}) => {
    const validarClave = ()=>{
        if(!pass) return false
        if(regexp_password.test(pass)) return true
        return false
    }

    const compararClaves = ()=>{
        if(!pass) return false
        if(!conPass) return false
        if(conPass.length == 0) return false
        if(conPass == pass) return true
        if(conPass != pass) return false
    }

    const validarForm = ()=>{
        if(!nombre || !pass || !correo) return false
        if(!nombre_usuario.test(nombre) || !regexp_password.test(pass) || !validarCorreo.test(correo)) return false
        return true
    }

    return {
        validarClave,
        compararClaves,
        validarForm
    }
}
