import express from 'express'
import Authenticate from '../middleware/Authenticate.js'
import { IsFalse, IsTrue, createChallenge, deleteChallenge, getChallenges } from '../controllers/challenges.controller.js'

const router = express.Router()

router.get("/", getChallenges)
router.post("/create", Authenticate, createChallenge)
router.delete("/delete/:id", deleteChallenge)
router.put('/task/isTrue/:id', IsTrue)
router.put('/task/isFalse/:id', IsFalse)

export default router