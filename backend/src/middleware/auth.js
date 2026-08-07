import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import User from "../models/user.model.js";

/**
 * Enterprise Production JWT & MongoDB Atlas Live Auth Middleware
 * Verifies JWT signature AND enforces live existence check in MongoDB Atlas.
 * Automatically clears cookies and returns 401 if user was deleted or disabled.
 */
export async function authenticateJWT(req, res, next) {
  let token = null;

  // 1. Check HTTP-Only Cookie first (df_access_token or token)
  if (req.cookies) {
    if (req.cookies.df_access_token) {
      token = req.cookies.df_access_token;
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
  }

  // 2. Check Authorization Bearer Header fallback
  if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  const isProduction = process.env.NODE_ENV === "production";
  const clearCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };

  const clearAuthCookies = () => {
    res.clearCookie("df_access_token", clearCookieOptions);
    res.clearCookie("token", clearCookieOptions);
    res.clearCookie("df_refresh_token", clearCookieOptions);
  };

  if (!token) {
    clearAuthCookies();
    return res.status(401).json({ success: false, message: "Unauthorized: Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    if (!userId) {
      clearAuthCookies();
      return res.status(401).json({ success: false, message: "Invalid session payload" });
    }

    // Live MongoDB Atlas Existence & Active Status Check
    const dbUser = await User.findById(userId).select("-password").lean();

    if (!dbUser || dbUser.isDeleted) {
      clearAuthCookies();
      return res.status(401).json({
        success: false,
        message: "User account no longer exists in database. Session invalidated.",
      });
    }

    // Attach fresh live MongoDB user document to request context
    req.user = {
      ...dbUser,
      id: dbUser._id,
      _id: dbUser._id,
    };

    next();
  } catch (error) {
    clearAuthCookies();
    return res.status(401).json({ success: false, message: "Invalid or expired session token" });
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access forbidden: Insufficient permissions" });
    }
    next();
  };
}
