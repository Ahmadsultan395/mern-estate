import express from "express"
import { testapi, updateuser } from "../controllers/user.controller.js";
import { VerifyUser } from "../utils/verifyUser.js";

const route = express.Router();

route.get("/test",testapi);

// Update user information route
route.post('/update/:id', VerifyUser, updateuser);
export default route;