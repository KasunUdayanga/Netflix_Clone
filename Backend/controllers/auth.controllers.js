import { User } from '../models/user.model.js';

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

    const PROFILE_PICS = ["/avatar1.png","/avatar2.jpg","/avatar3.png"];
    const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];

    const newUser = new User({
        email,
        password,
        username,
        image
    })

    await newUser.save()




   } catch (error) {
    console.log("ERROR in sign-up Controller", error.message)
    res.status(500).json({success:false,message:"Internal server ERROR"})
   }
}

export async function login(req,res){
    res.send("login route");
}

export async function logout(req,res){
    res.send("logout route");
}