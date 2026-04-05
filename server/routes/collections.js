const express = require('express');
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/collections — public collections
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const collections = await Collection.find({ isPublic: true })
      .populate('userId', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Collection.countDocuments({ isPublic: true });
    res.json({ collections, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/collections/mine — user's own collections (auth required)
router.get('/mine', auth, async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.userId })
      .populate('items')
      .sort({ updatedAt: -1 });
    res.json({ collections });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/collections — create a collection (auth required)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, isPublic } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const collection = new Collection({ title, description, isPublic, userId: req.userId });
    await collection.save();
    res.status(201).json({ collection });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/collections/:id/items — add item to collection
router.put('/:id/items', auth, async (req, res) => {
  try {
    const { inspirationId } = req.body;
    const collection = await Collection.findOne({ _id: req.params.id, userId: req.userId });
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    if (!collection.items.includes(inspirationId)) {
      collection.items.push(inspirationId);
      collection.updatedAt = Date.now();
      await collection.save();
    }
    res.json({ collection });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/collections/:id — delete a collection
router.delete('/:id', auth, async (req, res) => {
  try {
    const collection = await Collection.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!collection) return res.status(404).json({ error: 'Collection not found' });
    res.json({ message: 'Collection deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
