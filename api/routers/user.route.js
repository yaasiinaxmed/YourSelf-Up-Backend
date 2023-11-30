import express from 'express'
import Authenticate from '../middleware/Authenticate.js'
import { getUser, getUsers } from '../controllers/user.controller.js'

const router = express.Router()

router.get("/all-users", getUsers)
router.get("/", Authenticate, getUser)

export default router