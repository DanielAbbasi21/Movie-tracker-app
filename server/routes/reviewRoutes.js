const express = require("express");
const { createReview, getReviews, getReviewById } = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);


module.exports = router;