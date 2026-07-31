import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export function authenticateJWT(req, res, next) {
  let token = null;

  // 1. Check HTTP-Only Cookie first
  if (req.cookies && req.cookies.df_access_token) {
    token = req.cookies.df_access_token;
  } 
  // 2. Check Authorization Bearer Header fallback
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized access token required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: "Access forbidden: Insufficient permissions" });
      return;
    }
    next();
  };
}
