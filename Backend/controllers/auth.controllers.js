import { User } from '../models/user.model.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
import  bcryptjs  from "bcryptjs";


export async function signup(req,res){
   try {
    const{email,password,username}= req.body;

    if(!email || !password || !username){
        return res.status(400).json({success:false,message:"All Fields Are Required"})
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return res.status(400).json({success:false,message:"Invalid-Email"})
    }

    if(password.length <8){
        return res.status(400).json({success:false,message:"Password Must be least that 8 characters"})

    }

    const existingByEmail= await User.findOne({email:email})

    if(existingByEmail){
        return res.status(400).json({success:false,message:"Email Already Exists"})
    }


    const existingByUsername= await User.findOne({username:username})

    if(existingByUsername){
        return res.status(400).json({success:false,message:"Username Already Exists"})
    }
    const salt =await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png","/avatar2.jpg","/avatar3.png"];
    const image=PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
        email,
        password:hashedPassword,
        username,
        image,
    });

   
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        //remove password from the response
        res.status(201).json({
            success:true,
            user:{
                ...newUser._doc,
                password:"",
            },
        });

    
   




   } catch (error) {
    console.log("ERROR in sign-up Controller", error.message)
    res.status(500).json({success:false,message:"Internal server ERROR"})
   }
}

export async function login(req,res){
   try {
     const {email,password}=req.body;
     if(!email|| !password){
        return res.status(400).json({success:false,message:"all field are required"});
     }
     const user =await User.findOne({email:email})
     if(!user){
        return res.status(404).json({success:false,message:"invalid credentials"});
     }
     const ispasswordCorrect=await bcryptjs.compare(password,user.password);
     if (!ispasswordCorrect) {
        return res.status(400).json({success:false,message:"invalid credentials"});
     }
     generateTokenAndSetCookie(user._id,res);

     res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:""
        }
     })
   } catch (error) {
    console.log("Error in Login controller",error.message);
    res.status(500).json({success:false,message:"internal server error"});
   }
}

export async function logout(req,res){
   try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({success:true,message:"logged out succesfully"});
     
   } catch (error) {
    console.log("error in logout controller",error.message);
    res.status(500).json({success:false,message:"internal server error"});
   }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}