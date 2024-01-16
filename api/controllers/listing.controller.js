import Listing from "../models/Listing.model.js"
import { errorHandler } from "../utils/error.js"

export const ListingUser=async(req,res,next)=>{
    try {
        const listing=await Listing.create(req.body)
        return res.status(201).json(listing)
        
    } catch (error) {
        next(error)
    }
}

export const deleteList= async(req,res, next)=>{
    const delUserList = await Listing.findById(req.params.id)
    if(!delUserList){
        return next(errorHandler(404,'User list not found...!'))
    } 

    if(req.user.id !== delUserList.userRef){
        next(errorHandler(401,'you can only delete your own list'))
    }

    try {
            await Listing.findByIdAndDelete(req.params.id)
            res.status(200).json('delete user successfully...!')

    } catch (error) {
        next(error);
    }
    
}