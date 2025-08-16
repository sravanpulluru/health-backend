const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const sample = require('../data/donors.json');

router.get('/', async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    const q = {};
    if (bloodGroup) q.bloodGroup = { $regex: `^${bloodGroup}$`, $options: 'i' };
    if (location) q.location = { $regex: location, $options: 'i' };
    const donors = await Donor.find(q).sort({ createdAt: -1 });
    res.json(donors);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error fetching donors' });
  }
});

router.post('/load-sample', async (_req, res) => {
  try {
    await Donor.deleteMany({});
    await Donor.insertMany(sample);
    res.json({ ok: true, inserted: sample.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error loading sample donors' });
  }
});

module.exports = router;
