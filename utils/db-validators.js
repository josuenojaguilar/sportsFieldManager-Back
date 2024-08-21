import { Types } from "mongoose"
import Field from "../src/fields/field.model.js"
import User from "../src/users/user.model.js"
import Reservation from "../src/reservations/reservation.model.js"

export const validateReservationData = async(req, res, next)=>{
    const { fieldId, uid, startTime, endTime } = req.body

    if(!Types.ObjectId.isValid(fieldId) || !Types.ObjectId.isValid(uid)){
        return res.status(400).json(
            {
                msg: 'Cancha o usuario inválido'
            }
        )
    }
    try{
        const field = await Field.findById(fieldId)
        const user = await User.findById(uid)
        if(!field || !user) return res.status(404).json(
            {
                msg: 'Campo o usuario no existentes'
            }
        )
        const existingReservations = await Reservation.find(
            {
                fieldId,
                $or: [
                    {startTime: {$lt: endTime, $gte: startTime}},
                    {endTime: {$lt: startTime, $gte: endTime}},
                    {startTime: {$lt: startTime}, endTime: { $gte: endTime}}
                ]
            }
        )
        if(existingReservations.length > 0){
            return res.json(
                {
                    msg: 'El campo no está disponible en el horario solicitado'
                }
            )
        }
        next()
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al validar los datos de la reservación, intente de nuevo más tarde', err})
    }
}