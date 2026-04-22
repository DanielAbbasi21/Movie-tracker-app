const express = require("express");
const { createReview, getReviews, getReviewById, updateReview } = require("../controllers/reviewController");

const router = express.Router();

router.post("/", createReview);
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);


module.exports = router;