import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { ListingUser, deleteList ,updateList,getUserList,getListings} from '../controllers/listing.controller.js';

const router=express.Router()

router.post('/create',verifyUser,ListingUser )
router.delete('/delete/:id',verifyUser,deleteList)
router.post('/update/:id',verifyUser,updateList)
router.get('/get/:id',getUserList)
router.get('/get',getListings)


export default router;