const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  genre: {
    type: String
  },

  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  
});

module.exports = mongoose.model("Movie", movieSchema);