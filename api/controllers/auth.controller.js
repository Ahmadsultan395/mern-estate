import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res,next) => {
    const { username, email, password } = req.body;
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashpassword });

    try {
        await newUser.save(); // Use await here to wait for the save operation to complete
        res.status(201).json("User created successfully");
    } catch (error) {
        // res.status(500).json(error.message)
        next(error)
    }
};