const express = require('express');
const Inspiration = require('../models/Inspiration');
const router = express.Router();

// GET /api/search?q=&type=&color=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { q, type, color, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (q) {
      filter.$text = { $search: q };
    }
    if (type && ['image', 'video', 'illustration'].includes(type)) {
      filter.type = type;
    }
    if (color) {
      filter.colors = { $in: [color.toLowerCase()] };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const results = await Inspiration.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const total = await Inspiration.countDocuments(filter);

    res.json({ results, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/search/suggest?q= — autocomplete suggestions
router.get('/suggest', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ suggestions: [] });

    const regex = new RegExp('^' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const tagsAgg = await Inspiration.aggregate([
      { $unwind: '$tags' },
      { $match: { tags: regex } },
      { $group: { _id: '$tags' } },
      { $limit: 8 }
    ]);

    const suggestions = tagsAgg.map(t => t._id);
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
