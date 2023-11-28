import express from 'express'
import { GoogleAuth } from '../controllers/user.controller.js'

const router = express.Router()

router.post("/googleAuth", GoogleAuth)

export default router