import bcrypt from 'bcryptjs'

export const claveHash = (clave, hash)=>{
    return new Promise((resolve, reject) => {
        bcrypt.compare(clave, hash, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
}