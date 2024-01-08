import { json } from "express"
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcryptjs'
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