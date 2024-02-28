// verifyUser.js
import jwt from "jsonwebtoken";
import { errorhandle } from "./error.js";

export const VerifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorhandle(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorhandle(403, "Forbidden"));

    req.user = user;
    next();
  });
};
