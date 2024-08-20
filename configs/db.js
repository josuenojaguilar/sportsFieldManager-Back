//Archivo de conexión a la BD
'use strict' //Activar el modo estricto de JS (Valida algunas excepciones)

import mongoose from 'mongoose'

export const dbConnection = async ()=> { //Declarar la función
    try{

        //Ciclo de vida de la conexión
        mongoose.connection.on('error', ()=>{
            console.log('MongoDB | could not be connect to database')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB | Try connecting')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB | Connected to MongoDB')
        })
        mongoose.connection.on('open', ()=> {
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB | disconnected to MongoDB')
        })
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    }catch(err){
        console.error('Database connection failed', err)
    }
}