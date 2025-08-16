// backend/routes/feedbackRoutes.js
import express from "express";
import Feedback from "../models/Feedback.js";
const router = express.Router();

// @desc   Submit feedback
// @route  POST /api/feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    const feedback = new Feedback({
      name,
      email,
      message,
      rating
    });

    await feedback.save();
    res.json({ message: "✅ Feedback submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to submit feedback" });
  }
});

// @desc   Get all feedback (for admin)
// @route  GET /api/feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to fetch feedback" });
  }
});

export default router;
