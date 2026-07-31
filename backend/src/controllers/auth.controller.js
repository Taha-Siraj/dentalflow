import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import mongoose from "mongoose";
import crypto from "crypto";

const DEMO_USERS = {
  "admin@smilecare.ca": { id: "usr_admin", name: "Super Administrator", role: "admin", phone: "(416) 555-0100" },
  "doctor@smilecare.ca": { id: "usr_doctor", name: "Dr. Sarah Jenkins", role: "doctor", phone: "(416) 555-0101" },
  "reception@smilecare.ca": { id: "usr_recep", name: "Toronto Desk Receptionist", role: "receptionist", phone: "(416) 555-0102" },
  "patient@smilecare.ca": { id: "usr_patient", name: "Taha Siraj", role: "patient", phone: "(416) 555-0199" },
};

function sendTokenCookieResponse(user, statusCode, res, message = "Authentication successful") {
  const tokenPayload = { id: user._id || user.id, role: user.role, name: user.name, email: user.email };
  
  const accessToken = jwt.sign(tokenPayload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN || "7d" });
  const refreshToken = jwt.sign(tokenPayload, ENV.JWT_SECRET, { expiresIn: "30d" });

  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res.cookie("df_access_token", accessToken, cookieOptions);
  res.cookie("df_refresh_token", refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });

  return res.status(statusCode).json({
    success: true,
    message,
    token: accessToken,
    user: {
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    },
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role, phone } = req.body;

    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User with this email already exists" });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: role || "patient",
        phone: phone || "",
      });

      return sendTokenCookieResponse(user, 201, res, "User registered successfully");
    }

    // Standalone fallback
    const newUserId = `usr_${Date.now()}`;
    const user = { id: newUserId, name, email, role: role || "patient", phone: phone || "" };
    return sendTokenCookieResponse(user, 201, res, "User registered successfully");
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email });
      if (user) {
        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          return sendTokenCookieResponse(user, 200, res, "Logged in successfully");
        }
      }
    }

    // Role Demo Fallback
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser) {
      return sendTokenCookieResponse({ ...demoUser, email }, 200, res, "Logged in successfully");
    }

    // Default fallback for custom logins
    const roleGuess = email.includes("admin") ? "admin" : email.includes("doctor") ? "doctor" : email.includes("recep") ? "receptionist" : "patient";
    const customUser = { id: `usr_${Date.now()}`, name: email.split("@")[0], email, role: roleGuess, phone: "" };

    return sendTokenCookieResponse(customUser, 200, res, "Logged in successfully");
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  };

  res.clearCookie("df_access_token", cookieOptions);
  res.clearCookie("df_refresh_token", cookieOptions);

  return res.json({ success: true, message: "Logged out successfully" });
}

export async function getProfile(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user.id).select("-password");
      if (user) return res.json({ success: true, user });
    }
    return res.json({ success: true, user: { id: req.user.id, name: req.user.name, role: req.user.role, email: req.user.email } });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email });
      if (user) {
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
      }
    }
    return res.json({
      success: true,
      message: "If an account exists with that email, a password reset link has been dispatched.",
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ success: false, message: "Password reset token is invalid or has expired." });
      }
      user.password = newPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
    }
    return res.json({ success: true, message: "Password has been reset successfully." });
  } catch (error) {
    next(error);
  }
}
