import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn: '1h'});
}

//user
const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user) return res.status(404).json({success:false, message:"User not found"});

        const isMatch=await bcrypt.compare(password,user.password);

        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true,message:"Login Successfull",token})
        }
        else{
            res.status(401).json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:true,message:error.message})
    }
}


// userregistration

const registerUser=async (req, res)=>{
    // res.json({message:"api working register"})
    try {
        const { name, email, password } = req.body;
        //check if already have an entry in db
        const existingUser = await userModel.findOne({ email });
        if(existingUser){
            return res.json(
                {success:false,
                message:'user already existed'}
            )
        }

        // valiadting the credentials 
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:'invalid email'
            })
        }
        if(password.length<8){
            return res.json({
                success:false,
                message:'please enter strong password'
            })
        }
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create  new user
        const newUser=new userModel({
            name,email,password:hashedPassword
        })
        const user=await newUser.save();

        //token
        const token=createToken(user._id);
        res.json({
            success:true,
            token
        })

    } catch (error) {
        //if encounter error
        console.log(error);
        res.json({success:false,message:'something went wrong'});
    }
}

//admin 
const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({
                success:true,
                token
            })
        }
        else{   
            res.status(401).json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'something went wrong'});
    }

}
export {loginUser,registerUser,adminLogin}