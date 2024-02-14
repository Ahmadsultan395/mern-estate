import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
dotenv.config();

mongoose.connect(process.env.MONGODB , {
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
//allow jaso data 
app.use(express.json());

app.listen(3000, () => {
  console.log("The server is running on port 3000...");
});

app.use("/api/user",userRouter)
app.use("/api/user",authRouter)