console.log('🛠️ Backend is starting...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // ✅ just this, no path

// Import routes
const resourceRoutes = require('./routes/resourceRoutes');
const donorRoutes = require('./routes/donorRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve frontend

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// API Routes
app.use('/api/resources', resourceRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/feedback', feedbackRoutes);

// Fallback → index.html for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Environment
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing. Check your .env file!');
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
