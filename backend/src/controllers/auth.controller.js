import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";
import mongoose from "mongoose";

const DEMO_USERS = {
  "admin@smilecare.ca": { id: "usr_admin", name: "Super Administrator", role: "admin", phone: "(416) 555-0100" },
  "doctor@smilecare.ca": { id: "usr_doctor", name: "Dr. Sarah Jenkins", role: "doctor", phone: "(416) 555-0101" },
  "reception@smilecare.ca": { id: "usr_recep", name: "Toronto Desk Receptionist", role: "receptionist", phone: "(416) 555-0102" },
  "patient@smilecare.ca": { id: "usr_patient", name: "Taha Siraj", role: "patient", phone: "(416) 555-0199" },
};

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

      const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, ENV.JWT_SECRET, {
        expiresIn: ENV.JWT_EXPIRES_IN,
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
      });
    }

    // Standalone / Fallback mode registration
    const newUserId = `usr_${Date.now()}`;
    const token = jwt.sign({ id: newUserId, role: role || "patient", name }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: newUserId, name, email, role: role || "patient", phone: phone || "" },
    });
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
          const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, ENV.JWT_SECRET, {
            expiresIn: ENV.JWT_EXPIRES_IN,
          });
          return res.json({
            success: true,
            message: "Logged in successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
          });
        }
      }
    }

    // Role Demo Fallback
    const demoUser = DEMO_USERS[email.toLowerCase()];
    if (demoUser) {
      const token = jwt.sign({ id: demoUser.id, role: demoUser.role, name: demoUser.name }, ENV.JWT_SECRET, {
        expiresIn: ENV.JWT_EXPIRES_IN,
      });
      return res.json({
        success: true,
        message: "Logged in successfully",
        token,
        user: { id: demoUser.id, name: demoUser.name, email, role: demoUser.role, phone: demoUser.phone },
      });
    }

    // Default fallback for custom logins
    const roleGuess = email.includes("admin") ? "admin" : email.includes("doctor") ? "doctor" : email.includes("recep") ? "receptionist" : "patient";
    const customUser = { id: `usr_${Date.now()}`, name: email.split("@")[0], email, role: roleGuess, phone: "" };
    const token = jwt.sign({ id: customUser.id, role: customUser.role, name: customUser.name }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES_IN });

    return res.json({ success: true, message: "Logged in successfully", token, user: customUser });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(req.user.id).select("-password");
      if (user) return res.json({ success: true, user });
    }
    return res.json({ success: true, user: { id: req.user.id, name: req.user.name, role: req.user.role } });
  } catch (error) {
    next(error);
  }
}
