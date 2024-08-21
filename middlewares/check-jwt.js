import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next)=>{
    let secretKey = process.env.SECRET_KEY
    let { authorization } = req.headers

    if(!authorization) return res.status(401).send({message: 'Acceso no autorizado'})
    try{
        const token = jwt.verify(authorization, secretKey)
        req.uid = token.uid
    }catch(err){
        console.error(err)
        return res.status(403).send({message: 'Token inválido'})
    }
    return next()
}