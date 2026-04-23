import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));

    fetch("http://localhost:5000/api/movies")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  useEffect(() => {
  if (!showReviews) return;

  const interval = setInterval(() => {
    if (selectedUser) {
      fetchByUser();
    } else if (selectedMovie) {
      fetchByMovie();
    }
  }, 5000);

  return () => clearInterval(interval);
}, [showReviews, selectedUser, selectedMovie]);

  const fetchByUser = () => {
  if (!selectedUser) return;

  setLoading(true);
  setError("");

  fetch(`http://localhost:5000/api/reviews?userId=${selectedUser}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch user reviews");
      return res.json();
    })
    .then(data => {
      setReviews(data);
      setShowReviews(prev => prev || true);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  };

  const fetchByMovie = () => {
  if (!selectedMovie) return;

  setLoading(true);
  setError("");

  fetch(`http://localhost:5000/api/reviews?movieId=${selectedMovie}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch movie reviews");
      return res.json();
    })
    .then(data => {
      setReviews(data);
      setShowReviews(prev => prev || true);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  };

  const hideReviews = () => {
    setShowReviews(false);
  };

  const deleteReview = async (id) => {
  try {
    setError("");

    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete review");

      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateReview = async (id, updatedData) => {
  try {
    setError("");

    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update review");

    const data = await res.json();

    setReviews(prev =>
      prev.map(r => (r._id === id ? data : r))
    );
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="container">
      <h1>Reviews</h1>

      <div className="section">
        <h2>Filter Reviews</h2>

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

          <button onClick={hideReviews} className="danger">
            Hide
          </button>
        </div>

        <br />

        <div>
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

          <button onClick={hideReviews} className="danger">
            Hide
          </button>
        </div>
      </div>

      <div className="section">
        <ReviewForm onAdd={fetchByUser} />
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {showReviews && (
        <ReviewList
          reviews={reviews}
          onDelete={deleteReview}
          onUpdate={updateReview}
        />
      )}
    </div>
  );
}

export default App;