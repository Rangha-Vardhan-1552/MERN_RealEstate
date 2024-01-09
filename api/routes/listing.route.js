import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { ListingUser } from '../controllers/listing.controller.js';

const router=express.Router()

router.post('/create',verifyUser,ListingUser )

export default router;