const express = require('express');
const Inspiration = require('../models/Inspiration');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/inspirations — paginated feed
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const items = await Inspiration.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Inspiration.countDocuments();
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/inspirations — create an inspiration (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, imageUrl, type, tags, colors, artist, source } = req.body;
    if (!title || !imageUrl) return res.status(400).json({ error: 'Title and imageUrl are required' });
    const inspiration = new Inspiration({
      title, imageUrl, type, tags, colors, artist, source, userId: req.userId
    });
    await inspiration.save();
    res.status(201).json({ inspiration });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
