import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/error.js";

export const ListingUser = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteList = async (req, res, next) => {
    try {
        const delUserList = await Listing.findById(req.params.id);

        if (!delUserList) {
            return next(errorHandler(404, 'User list not found...!'));
        }

        if (req.user.id !== delUserList.userRef) {
            return next(errorHandler(401, 'You can only delete your own list'));
        }

        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

export const updateList = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, 'User list not found...!'));
        }

        if (req.user.id !== listing.userRef) {
            return next(errorHandler(401, 'You can update only your account...!'));
        }

        const updateList = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updateList);
    } catch (error) {
        next(error);
    }
};

export const getUserList= async(req,res, next)=>{
    try {
        const getList= await Listing.findById(req.params.id)
        if(!getList){
            return next(errorHandler(404,'list not found...!'))
        }
        res.status(200).json(getList)
    } catch (error) {
        next(error)
    }
}
