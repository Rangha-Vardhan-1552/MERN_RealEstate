import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { ListingUser, deleteList ,updateList} from '../controllers/listing.controller.js';

const router=express.Router()

router.post('/create',verifyUser,ListingUser )
router.delete('/delete/:id',verifyUser,deleteList)
router.post('/update/:id',verifyUser,updateList)

export default router;