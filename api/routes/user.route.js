import express from "express"
import { deleteUser, testapi, updateuser } from "../controllers/user.controller.js";
import { VerifyUser } from "../utils/verifyUser.js";

const route = express.Router();

route.get("/test",testapi);

// Update user information route
route.post('/update/:id', VerifyUser, updateuser);
route.delete('/delete/:id', VerifyUser, deleteUser);
export default route;