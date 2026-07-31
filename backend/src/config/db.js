import mongoose from "mongoose";
import { ENV } from "./env.js";

let isConnected = false;

export async function connectDB() {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    if (!ENV.MONGODB_URI) {
      console.warn("MONGODB_URI not configured, running server in mock mode");
      return;
    }
    const db = await mongoose.connect(ENV.MONGODB_URI, { serverSelectionTimeoutMS: 2500 });
    isConnected = db.connections[0]?.readyState === 1;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message} (Running server in mock mode)`);
  }
}
