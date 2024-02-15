import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandle } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser =  new User({ username, email, password: hashpassword });

    try {
        await newUser.save(); // Use await here to wait for the save operation to complete
        res.status(201).json("User created successfully");
    } catch (error) {
        // res.status(500).json(error.message)
        next(error)
    }
};


export const signIn = async (req,res,next)=>{
    try {
        const{email,password}= req.body;
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorhandle(404,"User not found"))
    const validPassword = bcryptjs.compareSync(password,validUser.password);
    if(!validPassword) return next(errorhandle(404,"wrong credential"))
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const{password:pass , ...rest} = validUser._doc;    
    res.cookie("access_token",token).status(200).json(rest);    


    } catch (error) {
        next(error);    
    }

}