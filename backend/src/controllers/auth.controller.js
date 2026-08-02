import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import { sendOtpEmail, sendPasswordResetEmail, sendStaffInvitationEmail } from "../utils/email.js";

/**
 * Helper to generate 6-digit OTP and SHA-256 Hash
 */
function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, hash };
}

/**
 * Helper to issue JWT tokens in HTTP-Only cookies
 */
function sendTokenCookieResponse(user, statusCode, res, message = "Authentication successful") {
  const tokenPayload = {
    id: user._id,
    role: user.role,
    name: user.name,
    email: user.email,
  };

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
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      emailVerified: user.emailVerified,
      branch: user.branch || "",
    },
  });
}

/**
 * POST /api/v1/auth/register (Patient Self-Registration)
 * Role parameter from frontend is strictly overridden. Role is ALWAYS 'patient'.
 */
export async function register(req, res, next) {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide Name, Email, and Password." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
    }

    const lowercaseEmail = email.toLowerCase().trim();
    let existingUser = await User.findOne({ email: lowercaseEmail });

    if (existingUser && existingUser.emailVerified) {
      return res.status(400).json({ success: false, message: "An account with this email address already exists." });
    }

    const { otp, hash } = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (existingUser && !existingUser.emailVerified) {
      existingUser.name = name;
      existingUser.phone = phone || existingUser.phone;
      existingUser.password = password; // Will be hashed by pre-save middleware
      existingUser.role = "patient";
      existingUser.otpHash = hash;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      existingUser = await User.create({
        name,
        email: lowercaseEmail,
        password,
        phone: phone || "",
        role: "patient", // STRICT ROLE ASSIGNMENT
        emailVerified: false,
        otpHash: hash,
        otpExpiry,
      });
    }

    // Send Real OTP Email via Gmail SMTP
    await sendOtpEmail(lowercaseEmail, otp, name);

    return res.status(200).json({
      success: true,
      message: "Verification OTP has been sent to your email address.",
      email: lowercaseEmail,
      requiresOtp: true,
      devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/verify-otp (Verify Email OTP)
 */
export async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Please provide both Email and 6-digit OTP code." });
    }

    const lowercaseEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: lowercaseEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User account not found." });
    }

    if (!user.otpHash || !user.otpExpiry) {
      return res.status(400).json({ success: false, message: "No active verification OTP found. Please request a new one." });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "OTP code has expired. Please request a new OTP code." });
    }

    const inputHash = crypto.createHash("sha256").update(otp.trim()).digest("hex");
    if (inputHash !== user.otpHash) {
      return res.status(400).json({ success: false, message: "Invalid OTP code. Please check and try again." });
    }

    // Activate Account
    user.emailVerified = true;
    user.otpHash = null;
    user.otpExpiry = null;
    await user.save();

    // Log User In with Cookie
    return sendTokenCookieResponse(user, 200, res, "Email verified successfully! Welcome to DentalFlow.");
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/resend-otp
 */
export async function resendOtp(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const { otp, hash } = generateOtp();
    user.otpHash = hash;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtpEmail(user.email, otp, user.name);

    return res.json({
      success: true,
      message: "New OTP code sent to your email address.",
      devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (error) {
    next(error);
  }
}


/**
 * POST /api/v1/auth/login (Production Database Authentication)
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide both Email and Password." });
    }

    const lowercaseEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: lowercaseEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email address or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email address or password." });
    }

    if (!user.emailVerified) {
      // Send fresh OTP for verification if unverified
      const { otp, hash } = generateOtp();
      user.otpHash = hash;
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await sendOtpEmail(user.email, otp, user.name);

      return res.status(403).json({
        success: false,
        requiresOtp: true,
        email: user.email,
        devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
        message: "Email address not verified yet. A fresh OTP code has been dispatched to your email.",
      });
    }

    return sendTokenCookieResponse(user, 200, res, "Sign in successful!");
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/create-staff (Admin Role Staff Assignment)
 */
export async function createStaffAccount(req, res, next) {
  try {
    const { name, email, phone, role, branch, department } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({ success: false, message: "Name, email, and role are required." });
    }

    const validRoles = ["doctor", "receptionist", "admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role assignment. Must be doctor, receptionist, or admin." });
    }

    const lowercaseEmail = email.toLowerCase().trim();
    let existingUser = await User.findOne({ email: lowercaseEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email already exists." });
    }

    const tempPassword = `Smile${Math.floor(100000 + Math.random() * 900000)}`;

    const staffUser = await User.create({
      name,
      email: lowercaseEmail,
      password: tempPassword,
      phone: phone || "",
      role,
      branch: branch || "",
      department: department || "",
      emailVerified: true,
    });

    await sendStaffInvitationEmail(lowercaseEmail, name, role, tempPassword);

    return res.status(201).json({
      success: true,
      message: `${role.toUpperCase()} staff account created successfully. Initial credentials sent to ${email}.`,
      user: {
        id: staffUser._id,
        name: staffUser.name,
        email: staffUser.email,
        role: staffUser.role,
        branch: staffUser.branch,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/forgot-password
 */
export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email address is required." });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    let devOtp = undefined;
    if (user) {
      const { otp, hash } = generateOtp();
      user.otpHash = hash;
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await sendPasswordResetEmail(user.email, otp, user.name);
      devOtp = process.env.NODE_ENV !== "production" ? otp : undefined;
    }

    return res.json({
      success: true,
      devOtp,
      message: "If an account exists with that email address, a password reset OTP has been sent.",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/verify-reset-otp
 */
export async function verifyResetOtp(req, res, next) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP code are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.otpHash || !user.otpExpiry) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset OTP code." });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "Reset OTP code has expired." });
    }

    const inputHash = crypto.createHash("sha256").update(otp.trim()).digest("hex");
    if (inputHash !== user.otpHash) {
      return res.status(400).json({ success: false, message: "Invalid OTP code." });
    }

    return res.json({ success: true, message: "Reset OTP code verified successfully." });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/reset-password
 */
export async function resetPassword(req, res, next) {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "Email, OTP code, and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters long." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || !user.otpHash || !user.otpExpiry) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset OTP code." });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ success: false, message: "Reset OTP code has expired." });
    }

    const inputHash = crypto.createHash("sha256").update(otp.trim()).digest("hex");
    if (inputHash !== user.otpHash) {
      return res.status(400).json({ success: false, message: "Invalid OTP code." });
    }

    user.password = newPassword; // Pre-save hook hashes it
    user.otpHash = null;
    user.otpExpiry = null;
    await user.save();

    return res.json({ success: true, message: "Password reset successful! Please log in with your new password." });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/v1/auth/logout
 */
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

/**
 * GET /api/v1/auth/me
 */
export async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id).select("-password -otpHash");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
}
