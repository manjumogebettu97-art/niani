const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  imageUrl:    { type: String, required: true },
  type:        { type: String, enum: ['image', 'video', 'illustration'], default: 'image' },
  tags:        [{ type: String }],
  colors:      [{ type: String }],
  artist:      { type: String, default: '' },
  source:      { type: String, default: '' },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now }
});

inspirationSchema.index({ title: 'text', tags: 'text', artist: 'text' });

module.exports = mongoose.model('Inspiration', inspirationSchema);
