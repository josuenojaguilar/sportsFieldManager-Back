import { generateJwt } from '../../utils/generate-jwt.js'
import User from '../users/user.model.js'
import bcryptjs from 'bcryptjs'

//Función declarativa
export const register = async(req, res)=>{
    try{
        const data = req.body
        data.profilePicture = req?.file?.filename ?? null
        let salt = await bcryptjs.genSalt()
        data.password = await bcryptjs.hash(data.password, salt)
        const user = new User(data)
        await user.save()
        return res.send(
            {
                message: `Usuario registrado en la base de datos correctamente, inicia sesión con el correo ${user.email}`,
                userDetails: {
                    user: user.username,
                    email: user.email
                }
            }
        )
    }catch(err){
        console.error('Error al registrar usuario', err)
        return res.status(500).send({message: 'No se pudo registrar al usuario, intenta de nuevo más tarde', err})
    }
}

export const login = async(req, res)=>{
    const { username, email, password } = req.body
    const loweEmail = email ? email.toLowerCase() : null
    const lowerUsername = username ? username.toLowerCase() : null
    try{
        const userExist = await User.findOne(
            {
                $or: [
                    {username: lowerUsername},
                    {email: loweEmail}
                ]
            }
        )
        if(!userExist){
            return res.status(404).json(
                {
                    msg: 'Credenciales inválidas',
                    error: 'Aún no tienes una cuenta con nosotros'
                }
            )
        }
        const checkPassword = await bcryptjs.compare(password, userExist.password)
        if(!checkPassword) return res.status(403).json(
            {
                msg: 'Credenciales inválidas',
                error: 'Contraseña incorrecta'
            }
        )
    
        const token = await generateJwt({uid: userExist._id, email: userExist.email})
        return res.json(
            {
                msg: 'Inicio de sesión exitoso',
                userDetails: {
                    username: userExist.username,
                    token,
                    profilePicture: userExist.profilePicture,
                    uid: userExist._id
                }
            }
        )
    }catch(err){
        console.error('Error al logearse', err)
        return res.status(500).send({message: 'Error al iniciar sesión, intenta de nuevo más tarde', err})
    }
}
