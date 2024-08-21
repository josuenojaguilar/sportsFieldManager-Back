import { Schema, model, version } from "mongoose"

const reservationSchema = Schema(
    {
        fieldId: {
            type: Schema.Types.ObjectId,
            ref: 'Field',
            required: true
        },
        uid: {
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true 
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        payment: {
            type: String
        },
        status: {
            type: String,
            enum: ['En proceso', 'Reservado', 'Cancelado'],
            default: 'En proceso'
        }
    }, 
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Reservation', reservationSchema)