const express = require("express");
const router = express.Router();

const { createMovie } = require("../controllers/movieController");

// POST /api/movies
router.post("/", createMovie);

module.exports = router;