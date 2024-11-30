const express = require("express");
const router = express.Router();
const { addReview, getReviews, deleteReview } = require("../controllers/recipeController");
const jwtVerify = require("../Middleware/jwtVerify");

// Add a review to a recipe
router.post("/:recipeId/reviews", jwtVerify, addReview);

// Get all reviews for a recipe
router.get("/:recipeId/reviews", getReviews);

// Delete a specific review
router.delete("/:recipeId/reviews/:reviewId", jwtVerify, deleteReview);

module.exports = router;
