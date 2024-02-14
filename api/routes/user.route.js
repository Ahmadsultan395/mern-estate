import express from "express"
import { testapi } from "../controllers/user.controller.js";

const route=express.Router();

route.get("/test",testapi)

export default route;