import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(ENV.MONGODB_URI, { serverSelectionTimeoutMS: 2500 });
    process.stdout.write("MongoDB Connected Successfully\n");
  } catch (error) {
    process.stdout.write(`MongoDB Connection Warning: ${error.message} (Running server in mock mode)\n`);
  }
}
