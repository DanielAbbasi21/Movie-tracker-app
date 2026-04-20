const Movie = require("../models/Movie");

// POST - create movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, rating, watched, watchedDate } = req.body;

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

module.exports = {
  createMovie
};