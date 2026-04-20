const Movie = require("../models/Movie");
const mongoose = require("mongoose");

// POST - create movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, rating, watched, watchedDate } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (rating !== undefined && (rating < 1 || rating > 10)) {
      return res.status(400).json({ error: "Rating must be between 1 and 10" });
    }

    if (watched === false && watchedDate) {
      return res.status(400).json({ error: "Cannot set watchedDate if movie is not watched" });
    }

    const movie = new Movie({
      title,
      genre,
      rating,
      watched,
      watchedDate
    });

    const savedMovie = await movie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET - get all movies/watched movies and not watched
const getMovies = async (req, res) => {
  try {
    const filter = {};

    if (req.query.watched !== undefined) {
      filter.watched = req.query.watched === "true";
    }

    const movies = await Movie.find(filter);

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PUT - update movie
const updateMovie = async (req, res) => {
  try {
    const { rating, watched, watchedDate } = req.body;

    if (rating !== undefined && (rating < 1 || rating > 10)) {
      return res.status(400).json({ error: "Rating must be between 1 and 10" });
    }

    if (watched === false && watchedDate) {
      return res.status(400).json({ error: "Cannot set watchedDate if movie is not watched" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE - delete movie
const deleteMovie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie
};