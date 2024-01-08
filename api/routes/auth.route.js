import express from 'express'
import { signUp,signin,google } from '../controllers/auth.controller.js'

const router=express.Router()
router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/google',google)

export default router;