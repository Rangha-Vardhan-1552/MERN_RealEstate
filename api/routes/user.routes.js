import express from 'express'
import { deleteUser, test ,updateUser,getUserListing, getUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'
const router=express.Router()
router.get('/test',test)
router.post('/update/:id',verifyUser, updateUser)
router.delete('/delete/:id',verifyUser, deleteUser)
router.get('/listing/:id',verifyUser,getUserListing)
router.get('/:id',verifyUser,getUser)

export default router;

