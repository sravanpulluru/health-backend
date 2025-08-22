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

/// ✅ Add your new deployed frontend
const allowedOrigins = [
  "http://localhost:3000",                  
  "https://health-frontend-usd8.vercel.app", 
  "https://health-frontend-szvj.vercel.app"   // NEW frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
