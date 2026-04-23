import { useState, useEffect } from "react";

function ReviewForm({ onAdd }) {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [userId, setUserId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  //GET users + movies
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      userId,
      movieId,
      rating: Number(rating),
      comment,
    };

    const res = await fetch("http://localhost:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    const data = await res.json();
    onAdd();

    setUserId("");
    setMovieId("");
    setRating("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Review</h2>

      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      <select value={movieId} onChange={(e) => setMovieId(e.target.value)}>
        <option value="">Select Movie</option>
        {movies.map(movie => (
          <option key={movie._id} value={movie._id}>
            {movie.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <input
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default ReviewForm;