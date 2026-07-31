import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error.js";
import { connectDB } from "./config/db.js";

const app = express();

// Security Headers
app.use(helmet({ contentSecurityPolicy: false }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" },
});
app.use("/api/", limiter);

// CORS Config for HTTP-Only Cookie credentials
const allowedOrigins = [
  "http://localhost:3000",
  "https://dentalflow-backend.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true); // Fallback allow for dev convenience
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless DB connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error:", err);
  }
  next();
});

// Root & Health Check Endpoints
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Smile Dental Clinic / DentalFlow API Backend is Running on Vercel",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      api: "/api/v1",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "DentalFlow API Server",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1", apiRouter);
app.use("/api", apiRouter);

app.use(errorHandler);

export function createApp() {
  return app;
}

export default app;
