const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  seasons: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  seriesImg: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // 👈 Use ObjectId for referencing users
    ref: 'users',
    required: true,
  },
  tmdbId: {
    type: String,
    required: true,
    unique: true, // ✅ Prevents duplicate TMDb series entries
  }
}, {
  timestamps: true // 👈 Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('series', seriesSchema);
