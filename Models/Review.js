const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: String, // use TMDb ID
    },
    tvShowId: {
      type: String, // use TMDb ID
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);

