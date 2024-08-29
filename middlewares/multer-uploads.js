import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from 'cloudinary'
import { extname } from 'path'
import { config } from "dotenv"


config()
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const createCloudinaryStorage = (folder)=>{
    return new CloudinaryStorage({
        cloudinary: cloudinary.v2,
        params: {
            folder: folder,
            public_id: (req, file)=>{
                const fileExtension = extname(file.originalname)
                const fileName = file.originalname.split(fileExtension)[0]
                return `${fileName}-${Date.now()}`
            }
        }
    })
}


const profileImageStorage = createCloudinaryStorage('profiles');

const fieldImageStorage = createCloudinaryStorage('fields');

const reservationImageStorage = createCloudinaryStorage('reservations')

export const uploadProfileImage = multer({
    storage: profileImageStorage,
    fileFilter: (req, file, cb)=>{
        cb(null, true)
    },
    limits:{
        fileSize: 10000000 //10mb
    }
})

export const uploadFieldImage = multer({
    storage: fieldImageStorage,
    fileFilter: (req, file, cb) => {
      cb(null, true)
    },
    limits: {
      fileSize: 10000000,
    },
  });

  export const uploadReservationImage = multer({
    storage: reservationImageStorage,
    fileFilter: (req, file, cb) => {
      cb(null, true)
    },
    limits: {
      fileSize: 10000000,
    },
  });