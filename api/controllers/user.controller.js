import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorhandle } from "../utils/error.js";

// Middleware for verifying JWT token
// Middleware for verifying JWT token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorhandle(401, "Unauthorized: Missing token"));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User:", user); // Log decoded user information
    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    if (error.name === "TokenExpiredError") {
      return next(errorhandle(401, "Unauthorized: Token expired"));
    }
    return next(errorhandle(403, "Forbidden: Invalid token"));
  }
};


// Test API
export const testapi = (req, res) => {
  res.json({
    status: 200,
    message: "API run successfully",
  });
};

// Update user information

export const updateuser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorhandle(401, "You can only update your own account"));
    }

    // Hash the password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user in the database
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // Check if the user was not found
    if (!updateUser) {
      return next(errorhandle(404, "User not found"));
    }

    // Exclude password from the response
    const { password, ...rest } = updateUser._doc;
res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



 export const deleteUser = async (req,res,next)=>{
  if(req.user.id !== req.params.id)
  return next(errorhandle(401,"you can only delete your account"));
try {
  await User.findByIdAndDelete(req.params.id);
  res.clearCookie('access_token');
  res.status(200).json({message:"User has been Deleted"});
} catch (error) {
  next(error);
}
}

