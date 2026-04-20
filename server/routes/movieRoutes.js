const express = require("express");
const router = express.Router();

const { createMovie, getMovies } = require("../controllers/movieController");

// POST /api/movies
router.post("/", createMovie);

//GET /api/movies
router.get("/", getMovies);

module.exports = router;