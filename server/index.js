require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const collectionRoutes = require('./routes/collections');
const searchRoutes = require('./routes/search');
const inspirationRoutes = require('./routes/inspirations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// MongoDB connection (falls back to in-memory mock if unavailable)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ninani-design')
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB not available — using in-memory store'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/inspirations', inspirationRoutes);

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ninani Design server running at http://localhost:${PORT}`);
});
