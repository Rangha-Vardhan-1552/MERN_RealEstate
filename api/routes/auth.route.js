import express from 'express'
import { signUp,signin,google, signOut } from '../controllers/auth.controller.js'

const router=express.Router()
router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signout',signOut)

export default router;