import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { ListingUser, deleteList } from '../controllers/listing.controller.js';

const router=express.Router()

router.post('/create',verifyUser,ListingUser )
router.delete('/delete/:id',verifyUser,deleteList)

export default router;