const express = require("express");
const userController = require("./Controllers/userController");
const adminController = require("./Controllers/adminController");
const jwtMiddleware = require("./middleware/jwtmiddleware");
const multerConfig = require("./middleware/multerMiddleware");
const movieController = require("./Controllers/movieController");
const seriesController = require("./Controllers/seriesController");
const reviewController = require("./Controllers/reviewController");

const router = new express.Router();

// ✅ User and Admin Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/adminregister", adminController.Adminregister);
router.post("/adminlogin", adminController.Adminlogin);

// ✅ Movie & Series Routes
router.post("/add-movies", jwtMiddleware, multerConfig.single("movieImg"), movieController.addMovies);
router.post("/add-series", jwtMiddleware, multerConfig.single("seriesImg"), seriesController.addSeries);
router.get("/user-movies", jwtMiddleware, movieController.getUserMoviesController);
router.get("/user-series", jwtMiddleware, seriesController.getUserSeriesController);
router.delete("/remove-usermovies/:id", jwtMiddleware, movieController.removeUserMovieController);
router.delete("/remove-userseries/:id", jwtMiddleware, seriesController.removeUserSeriesController);
router.put("/update-usermovies/:id", jwtMiddleware, multerConfig.single("movieImg"), movieController.updateUserMovieController);
router.put("/update-userseries/:id", jwtMiddleware, multerConfig.single("seriesImg"), seriesController.updateUserSeriesController);

router.get("/users/count", userController.getUserCount);



// ✅ Review Routes
router.get("/reviews/:id", reviewController.getReviewsById);

// Keep your existing routes:
// In your router file
router.post("/reviews", jwtMiddleware, reviewController.addReview);

router.get("/reviews/tv/:tvShowId", reviewController.getReviewsByTVShow);
router.get("/reviews/movie/:movieId", reviewController.getReviewsByMovie);
router.delete("/reviews/:reviewId", jwtMiddleware, reviewController.deleteReview);
router.put("/reviews/:reviewId", jwtMiddleware, reviewController.editReview);

// Admin route to get all reviews
router.get("/all-reviews", reviewController.getAllReviews);

 // Admin: Get all reviews

// ✅ Route to get review count
router.get("/reviews/all-reviews/count", reviewController.getReviewCount);


// router.get("/by-tmdb/:tmdbId", movieController.getMovieByTmdbId);
// router.get("/by-tmdb/:tmdbId", seriesController.getSeriesByTmdbId);

router.delete("/all-reviews/:id", reviewController.deleteReview);


module.exports = router;
