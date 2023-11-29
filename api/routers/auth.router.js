import express from 'express'
import { GoogleAuth } from '../controllers/auth.controller.js'

const router = express.Router()

router.post("/googleAuth", GoogleAuth)

export default router