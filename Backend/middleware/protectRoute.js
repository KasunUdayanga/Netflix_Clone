import jwt from "jsonwebtoken";
import {User} from '../models/user.model.js';
import {EW_VARS} from '../config/envVars.js';

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies ["jwt-netflix"]

        if(!token){
            return res.status(401).json({success: false,message: "Unauthorized - No Token Provided"})
            
        }
        const decoded = jwt.verify(token,EW_VARS.jwt_SECRET);
        
        if (!decoded){
            return res.status(401).json({success: false,message: "Unauthorized - Invalid Token"})
        }

        const user =await User.findById(decoded.userId).select("password");

        if(!user){
            return res.status(401).json({success: false,message: "user not found"})
        }

        req.user = user;

        next();

    }
    catch(error){
        console.log("Error in protectRour: ".error.message);
        res.status(see).json({success: false,message: "Internal Server Error"});
    }
}



