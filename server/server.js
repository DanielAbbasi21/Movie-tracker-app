const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movieRoutes");

const app = express();
app.use(express.json());


app.use("/api/movies", movieRoutes);


app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;



mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => console.log(err));