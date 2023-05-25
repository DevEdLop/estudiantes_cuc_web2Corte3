import jwt from 'jsonwebtoken';
import { SECRET_JWT } from '../config.js';

const generarJWT = (id, name) => {

    return new Promise((resolve, reject) => {
        const payload = { id, name }

        jwt.sign(payload, SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se fue posible generar el token')
            }

            resolve(token)
        })
    })

}

export default generarJWT;