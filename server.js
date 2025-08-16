console.log('🛠️ Backend is starting...');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const resourceRoutes = require('./routes/resourceRoutes');
const donorRoutes = require('./routes/donorRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*' // or 'https://your-frontend.vercel.app'
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api/resources', resourceRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing. Set it in backend/.env');
  process.exit(1);
}

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (${process.env.NODE_ENV || 'development'} mode)`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
