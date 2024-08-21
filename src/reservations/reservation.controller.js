import Reservation from "./reservation.model.js"
import Field from "../fields/field.model.js"

export const reserveField = async(req, res)=>{
    const { fieldId, uid, startTime, endTime } = req.body    
    let payment = req?.file?.filename ?? null
    try{
        const reservation = new Reservation(
            {
                fieldId,
                uid,
                startTime,
                endTime,
                payment
            }
        )
        await reservation.save()
        res.json(
            {
                msg: 'Reserva creada exitosamente',
                reservation
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({msg: 'Error al procesar la reservación, intente nuevamente más tarde', err})
    }
}

export const userReservations = async(req, res)=>{
    const uid = req.uid
    try{
        const reservations = await Reservation.find({uid})
            .populate(
                {
                    path: 'fieldId',
                    select: 'fieldName'
                }
            )
            .select('-createdAt -updatedAt -uid')        
        if(reservations.length < 1) return res.status(404).json(
            {
                msg: 'No se encontraron reservaciones para este usuario'
            }
        )
        //Momentaneo
        return res.json({reservations})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al obtener las reservaciones'})
    }
}