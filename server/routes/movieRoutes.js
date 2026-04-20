const express = require("express");
const router = express.Router();

const { createMovie, getMovies, updateMovie, deleteMovie } = require("../controllers/movieController");

router.post("/", createMovie);

router.get("/", getMovies);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = router;