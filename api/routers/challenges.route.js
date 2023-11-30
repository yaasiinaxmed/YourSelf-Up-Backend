import express from 'express'
import Authenticate from '../middleware/Authenticate.js'
import { createChallenge, getChallenges } from '../controllers/challenges.controller.js'

const router = express.Router()

router.get("/", getChallenges)
router.post("/create", Authenticate, createChallenge)

export default router