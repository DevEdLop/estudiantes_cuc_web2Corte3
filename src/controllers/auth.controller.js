import { request, response } from 'express';
import bcrypt from 'bcryptjs';
import generarJWT from '../helpers/JWT.js';
import { format } from 'date-fns'

const estudiantes = []
export const crearEstudiante = async (req = request, res = response) => {
    const { name, lastName, email, password } = req.body;


    try {


        if (name == "" || lastName == "" || email == "" || password == "") {
            return res.status(400).json({
                ok: false,
                msg: 'Por favor verifique todos los campos esten diligenciados'
            })
        }
        const salt = bcrypt.genSaltSync();

        const newEstudiante = {
            password: bcrypt.hashSync(password, salt),
            id: Date.now() * 100,
            lastName: lastName,
            email: email,
            name: name
        }

        //Generar el jwt
        const token = await generarJWT(newEstudiante.id, newEstudiante.name)
        console.log(newEstudiante)

        estudiantes.push(newEstudiante)

        return res.status(201).json({
            ok: true,
            date: format(new Date(), 'yyyy/MM/dd hh:mm:ss a'),
            msg: `Ha sido registrado ${newEstudiante.name} - ${newEstudiante.lastName} satisfactoriamente con el correo ${newEstudiante.email}`,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }


}

export const loginEstudiante = async (req = request, res = response) => {

    // console.log(req.body)
    // console.log(estudiantes)
    const { email, password } = req.body


    try {
        if (email == "" || password == "") {
            return res.status(400).json({
                ok: false,
                msg: 'Por favor verifique las credenciales'
            })
        }
        const checkEstudiante = estudiantes.find(est => est.email === email)

        const validPassword = bcrypt.compareSync(password, checkEstudiante.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'

            })
        }
        //Generar el jwt
        const token = await generarJWT(checkEstudiante.id, checkEstudiante.name)
        console.log(estudiantes)

        return res.status(201).json({
            ok: true,
            date: format(new Date(), 'yyyy/MM/dd hh:mm:ss a'),
            msg: `Logueado Exitosamente`,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            ok: false,
            msg: 'Por favor valide las credenciales'
        })
    }

}