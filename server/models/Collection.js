const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inspiration' }],
  coverImage:  { type: String, default: '' },
  isPublic:    { type: Boolean, default: true },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collection', collectionSchema);
