import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGODB, {
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
.then(() => {
  console.log("MongoDB database connected");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("The server is running on port 3000...");
});

app.use('/api/user', userRouter);
app.use("/api/auth",authRouter)

//create a middleware for api 
app.use((err, req, res, next) => {
  console.error("Error Middleware:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
  });
});

