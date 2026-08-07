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
  max: 500, // limit each IP to 500 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" },
});
app.use("/api/", limiter);

// Explicit CORS Configuration for HTTP-Only Cookie Credentials
const corsOptions = {
  origin: (origin, callback) => {
    // Return exact requesting origin string to satisfy browser credentials mode requirement
    if (origin) {
      callback(null, origin);
    } else {
      callback(null, "http://localhost:3000");
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Force Zero CDN & Edge Response Caching on Vercel
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});


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
