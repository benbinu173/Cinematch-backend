const Review = require("../Models/Review");
const jwt = require("jsonwebtoken");

// ✅ Add Review
exports.addReview = async (req, res) => {
  console.log("Incoming review request:", req.body);

  try {
    const userId = req.payload;
    const { tvShowId, movieId, reviewText, rating } = req.body;

    // Require at least one of tvShowId or movieId
    if ((!tvShowId && !movieId) || !reviewText || !rating) {
      return res
        .status(400)
        .json({
          error: "TV Show ID or Movie ID, review text, and rating are required.",
        });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    const newReview = new Review({
      tvShowId: tvShowId || undefined,
      movieId: movieId || undefined,
      user: userId,
      reviewText,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully", review: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get Reviews for a TV Show
exports.getReviewsByTVShow = async (req, res) => {
  const { tvShowId } = req.params;
  try {
    const reviews = await Review.find({ tvShowId }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ✅ Get Reviews for a Movie
exports.getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movieId }).populate("user", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ✅ Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.payload;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Edit Review
exports.editReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = req.payload;
    const { reviewText, rating } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== userId)
      return res.status(403).json({ message: "Unauthorized" });

    review.reviewText = reviewText || review.reviewText;
    review.rating = rating ?? review.rating;

    await review.save();
    res.status(200).json({ message: "Review updated", review });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Reviews by ID (for either TV show or movie)
exports.getReviewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ $or: [{ movieId: id }, { tvShowId: id }] })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// ✅ Get All Reviews (Admin)
// const Review = require("../models/review");
const axios = require("axios");

const TMDB_API_KEY = "104982ca487a975dd171416b2958f849"; // ✅ Already using
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

exports.getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find().populate("user", "username");

    // Map over reviews to fetch titles from TMDb
    const enrichedReviews = await Promise.all(
      allReviews.map(async (review) => {
        let title = "Unknown Title";

        if (review.movieId) {
          const movieRes = await axios.get(`${TMDB_BASE_URL}/movie/${review.movieId}?api_key=${TMDB_API_KEY}`);
          title = movieRes.data.title;
        } else if (review.tvShowId) {
          const tvRes = await axios.get(`${TMDB_BASE_URL}/tv/${review.tvShowId}?api_key=${TMDB_API_KEY}`);
          title = tvRes.data.name;
        }

        return {
          ...review.toObject(),
          title, // Add the title
        };
      })
    );

    res.status(200).json(enrichedReviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
};


// ✅ Get Review Count
exports.getReviewCount = async (req, res) => {
    try {
      const count = await Review.countDocuments();
      console.log("Review count from DB:", count); // Add this
      res.status(200).json({ count });
    } catch (error) {
      console.error("Error getting review count:", error);
      res.status(500).json({ error: "Failed to fetch review count" });
    }
  };

  exports.deleteReview = async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  
