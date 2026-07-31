import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
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
