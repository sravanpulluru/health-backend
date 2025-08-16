const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const sample = require('../data/resources.json');

router.get('/', async (req, res) => {
  try {
    const { location, type } = req.query;
    const q = {};
    if (location) q.location = { $regex: location, $options: 'i' };
    if (type) q.type = { $regex: `^${type}$`, $options: 'i' };
    const resources = await Resource.find(q).sort({ createdAt: -1 });
    res.json(resources);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error fetching resources' });
  }
});

router.post('/load-sample', async (_req, res) => {
  try {
    await Resource.deleteMany({});
    await Resource.insertMany(sample);
    res.json({ ok: true, inserted: sample.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error loading sample resources' });
  }
});

module.exports = router;
