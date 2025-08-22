import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import resourceRoutes from "./routes/resourceRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();
const app = express();

// ✅ Flexible CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow requests like Postman or server-to-server
    const allowed = [
      "http://localhost:3000",        // local dev
    ];
    const vercelRegex = /\.vercel\.app$/; // allow any *.vercel.app domain

    if (allowed.includes(origin) || vercelRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/resources", resourceRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Backend is running...");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));
