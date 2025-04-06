const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
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
  movieImg: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // 👈 Better to reference a user by ObjectId
    ref: 'users', // assuming your users model is named 'users'
    required: true,
  },
  tmdbId: {
    type: String,
    required: true,
    unique: true, // ✅ To prevent duplicate movie entries
  },
}, {
  timestamps: true // 👈 Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('movies', moviesSchema);
