import { Router } from "express"
import {
    reserveField,
    userReservations
} from './reservation.controller.js'
import { uploadReservationImage } from "../../middlewares/multer-uploads.js"
import { addReservation } from "../../middlewares/check-validators.js"
import { validateJwt } from "../../middlewares/check-jwt.js"

const api = Router()

api.post(
    '/addReservation',
    validateJwt,
    uploadReservationImage.single('payment'),
    addReservation,
    reserveField
)

api.get(
    '/myReservations',
    validateJwt,
    userReservations
)

export default api