// backend/routes/resourceRoutes.js
import express from "express";
import Resource from "../models/Resource.js"; // make sure you have this model
const router = express.Router();

// @desc   Get resources by location & type
// @route  GET /api/resources
router.get("/", async (req, res) => {
  try {
    const { location, type } = req.query;

    let query = {};
    if (location) {
      query.location = { $regex: location, $options: "i" }; // case-insensitive search
    }
    if (type) {
      query.type = type;
    }

    const resources = await Resource.find(query);
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching resources" });
  }
});

// @desc   Add sample resources (optional seed route)
// @route  POST /api/resources/addSample
router.post("/addSample", async (req, res) => {
  try {
    const sampleData = [
      {
        name: "Apollo Hospital",
        type: "Hospital",
        location: "Hyderabad",
        contact: "9876543210",
        lat: 17.4375,
        lng: 78.4483,
      },
      {
        name: "KIMS Clinic",
        type: "Clinic",
        location: "Hyderabad",
        contact: "9876543222",
        lat: 17.4475,
        lng: 78.4583,
      },
    ];

    await Resource.insertMany(sampleData);
    res.json({ message: "✅ Sample resources added!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to add sample resources" });
  }
});

export default router;
