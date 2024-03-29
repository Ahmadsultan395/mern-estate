import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorhandle } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const signUp = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser =  new User({ username, email, password: hashpassword });

    try {
        await newUser.save(); 
        res.status(201).json("User created successfully");
    } catch (error) {
        // res.status(500).json(error.message)
        next(error)
    }
};


// export const signIn = async (req,res,next)=>{
//     try {
//         const{email,password}= req.body;
//     const validUser = await User.findOne({email});
//     if (!validUser) return next(errorhandle(404,"User not found"))
//     const validPassword = bcryptjs.compareSync(password,validUser.password);
//     if(!validPassword) return next(errorhandle(404,"wrong credential"))
//     const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
//     const{password:pass , ...rest} = validUser._doc;    
//     res.cookie("access_token",token).status(200).json(rest);    


//     } catch (error) {
//         next(error);    
//     }

// }


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // const validUser = await User.findOne({ email });
        const validUser = await User.findOne({ email: { $regex: new RegExp(email, 'i') } });


        console.log("Request Body:", req.body);
        console.log("validUser:", validUser);

        if (!validUser) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        console.log("validPassword:", validPassword);

        if (!validPassword) {
            const error = new Error("Wrong credentials");
            error.status = 401;
            throw error;
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie("access_token", token,{httpOnly:true}).status(200).json(rest);
    } catch (error) {
        console.error("SignIn Error:", error);
        next(error);
    }
};


export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashpassword = bcryptjs.hashSync(generatePassword, 10);
            const newUser = new User({
                username:req.body.name.split("").join("").toLowerCase() +
                    Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashpassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}


export const signOut = async (req,res,next)=>{
    try {
     res.clearCookie('access_token');
      res.status(200).json("user has been signOut");
    } catch (error) {
      next(error);
    }
  }