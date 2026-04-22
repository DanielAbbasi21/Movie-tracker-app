const Review = require("../models/Review");
const mongoose = require("mongoose");

const createReview = async (req, res) => {
  try {
    const { userId, movieId, rating, comment } = req.body;

    if (!userId || !movieId || !rating) {
      return res.status(400).json({ error: "userId, movieId and rating are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    if (rating < 1 || rating > 10) {
      return res.status(400).json({ error: "Rating must be between 1 and 10" });
    }

    const review = new Review({
      userId,
      movieId,
      rating,
      comment
    });

    const savedReview = await review.save();

    res.status(201).json(savedReview);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getReviews = async (req, res) => {
  try {
    const filter = {};

    if (req.query.movieId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.movieId)) {
        return res.status(400).json({ error: "Invalid movie ID" });
      }
      filter.movieId = req.query.movieId;
    }

    if (req.query.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      filter.userId = req.query.userId;
    }

    const reviews = await Review.find(filter)
      .populate("userId", "username email")
      .populate("movieId", "title genre");

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createReview, getReviews };