import { json } from "express"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
import Listing from '../models/Listing.model.js'
export const test=(req,res)=>{
    res.send('app is working fine...!')
}

export const updateUser= async(req,res,next) =>{
   if(req.user.id !== req.params.id) return next(errorHandler(403,'You can only update own account'))

   try {
    if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,10)
    }
        const updatePassword= await User.findByIdAndUpdate(req.params.id,
        {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            },
        },
        {new:true}
        );
    
    const {password, ...rest }=updatePassword._doc ;

    res.status(200).json(rest)
    // res.send("User profile update successfully...!")

   } catch (error) {
    next(error)
   }
    
}

export const deleteUser=async(req,res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can delete your own account only...'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('user delete successfully')
    } catch (error) {
        next(error)
    }
};

export const getUserListing= async(req,res, next)=>{
    if(req.user.id === req.params.id){
        try {
            const result= await Listing.find({userRef:req.params.id})
            res.status(200).json(result)
            
        } catch (error) {
            next(error)
        }
    }else{
        next(errorHandler(401,'You can view only your own listings'))
    }
}

export const getUser=async(req,res, next)=>{
    try {
        const user= await User.findById(req.params.id)
        if(!user) return next(errorHandler(404, 'user not found...!'))
        const {password:pass, ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}