//Servidor Web
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection} from './db.js'

//POO crear más servidores
export class ExpressServer {
    constructor(){
        this.app = express()
        this.middlewares()
        this.connectDB()
    }
    async connectDB(){ //Ejecutar el código del db.js | conectarse a la BD
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(helmet())
        this.app.use(morgan('tiny'))
    }
    
    listen() {
        this.app.listen(process.env.PORT, ()=>{
            console.log(`Server HTTP is running in port ${process.env.PORT}`)
        })
    }
}