import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const fetchByUser = () => {
    if (!selectedUser) return;

    fetch(`http://localhost:5000/api/reviews?userId=${selectedUser}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setShowReviews(true);
      });
  };

  const fetchByMovie = () => {
    if (!selectedMovie) return;

    fetch(`http://localhost:5000/api/reviews?movieId=${selectedMovie}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setShowReviews(true);
      });
  };

  const hideReviews = () => {
    setShowReviews(false);
    setReviews([]);
  };

  return (
    <div>
      <h1>Reviews</h1>

      <div>
        <select onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>

        <button onClick={fetchByUser}>
          Show User Reviews
        </button>

        <select onChange={(e) => setSelectedMovie(e.target.value)}>
          <option value="">Select Movie</option>
          {movies.map(movie => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>

        <button onClick={fetchByMovie}>
          Show Movie Reviews
        </button>

        <button onClick={hideReviews}>
          Hide Reviews
        </button>
      </div>

      <ReviewForm onAdd={hideReviews} />

      {showReviews && <ReviewList reviews={reviews} />}
    </div>
  );
}

export default App;