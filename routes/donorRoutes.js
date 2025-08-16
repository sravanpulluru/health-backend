// backend/routes/donorRoutes.js
import express from "express";
import Donor from "../models/Donor.js"; // create donor model
const router = express.Router();

// @desc   Get donors by blood group & location
// @route  GET /api/donors
router.get("/", async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;

    let query = {};
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const donors = await Donor.find(query);
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching donors" });
  }
});

// @desc   Add sample donors (optional seed)
// @route  POST /api/donors/addSample
router.post("/addSample", async (req, res) => {
  try {
    const sampleDonors = [
      { name: "John Doe", bloodGroup: "A+", location: "Hyderabad", contact: "9999999991" },
      { name: "Ravi Kumar", bloodGroup: "B-", location: "Hyderabad", contact: "9999999992" },
      { name: "Sara Ali", bloodGroup: "O+", location: "Bangalore", contact: "9999999993" }
    ];

    await Donor.insertMany(sampleDonors);
    res.json({ message: "✅ Sample donors added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to add donors" });
  }
});

export default router;
