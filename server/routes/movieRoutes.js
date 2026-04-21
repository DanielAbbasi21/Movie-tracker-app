const express = require("express");
const router = express.Router();

const { createMovie, getMovies, updateMovie, deleteMovie, getMovieById } = require("../controllers/movieController");

router.post("/", createMovie);

router.get("/", getMovies);

router.get("/:id", getMovieById);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;