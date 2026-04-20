const express = require("express");
const router = express.Router();

const { createMovie, getMovies, updateMovie } = require("../controllers/movieController");

router.post("/", createMovie);

router.get("/", getMovies);

router.put("/:id", updateMovie);

module.exports = router;