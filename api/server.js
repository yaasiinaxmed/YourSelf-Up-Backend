import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routers/user.router.js'

dotenv.config()

const server = express()

server.use(express.json())
server.use(cors())

mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected MongoDB")
}).catch((error) => {
    console.log('Connecting MongoDB Error:', error)
})

server.use("/api/user", userRouter)

export default server