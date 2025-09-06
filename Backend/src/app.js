import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Ensure cors is imported

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // Enable cookies and credentials
  })
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.route.js";

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/product", productRouter);

// Example: http://localhost:8000/api/v1/users/register

export { app };
