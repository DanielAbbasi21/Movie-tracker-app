import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

const API_URL = "https://movie-tracker-app-backend-2qjg.onrender.com";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setError("");

        const usersRes = await fetch(`${API_URL}/api/users`);
        if (!usersRes.ok) {
          throw new Error("Failed to fetch users");
        }

        const usersData = await usersRes.json();
        setUsers(Array.isArray(usersData) ? usersData : usersData.users || []);

        const moviesRes = await fetch(`${API_URL}/api/movies`);
        if (!moviesRes.ok) {
          throw new Error("Failed to fetch movies");
        }

        const moviesData = await moviesRes.json();
        setMovies(Array.isArray(moviesData) ? moviesData : moviesData.movies || []);
      } catch (err) {
        console.error("Initial data fetch error:", err);
        setError(err.message);
      }
    };

    fetchInitialData();
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

  const fetchByUser = async () => {
    if (!selectedUser) {
      setError("Please select a user");
      return;
    }

    try {
      setViewMode("user");
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/reviews?userId=${selectedUser}`);

      if (!res.ok) {
        throw new Error("Failed to fetch user reviews");
      }

      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
      setShowReviews(true);
    } catch (err) {
      console.error("Fetch user reviews error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchByMovie = async () => {
    if (!selectedMovie) {
      setError("Please select a movie");
      return;
    }

    try {
      setViewMode("movie");
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/reviews?movieId=${selectedMovie}`);

      if (!res.ok) {
        throw new Error("Failed to fetch movie reviews");
      }

      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews || []);
      setShowReviews(true);
    } catch (err) {
      console.error("Fetch movie reviews error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const hideReviews = () => {
    setShowReviews(false);
  };

  const deleteReview = async (id) => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete review");
      }

      setReviews((prev) => prev.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Delete review error:", err);
      setError(err.message);
    }
  };

  const updateReview = async (id, updatedData) => {
    try {
      setError("");

      const res = await fetch(`${API_URL}/api/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update review");
      }

      const data = await res.json();

      setReviews((prev) =>
        prev.map((review) => (review._id === id ? data : review))
      );
    } catch (err) {
      console.error("Update review error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Movie Reviews 🍿</h1>

      <div className="section">
        <h2>Filter Reviews</h2>

        <div>
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setSelectedMovie("");
            }}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>

          <button onClick={fetchByUser}>Show User Reviews</button>

          <button onClick={hideReviews} className="danger">
            Hide
          </button>
        </div>

        <br />

        <div>
          <select
            value={selectedMovie}
            onChange={(e) => {
              setSelectedMovie(e.target.value);
              setSelectedUser("");
            }}
          >
            <option value="">Select Movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>

          <button onClick={fetchByMovie}>Show Movie Reviews</button>

          <button onClick={hideReviews} className="danger">
            Hide
          </button>
        </div>
      </div>

      <div className="section">
        <ReviewForm onAdd={viewMode === "movie" ? fetchByMovie : fetchByUser} />
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {showReviews && (
        <ReviewList
          reviews={reviews}
          onDelete={deleteReview}
          onUpdate={updateReview}
          showActions={viewMode === "user"}
        />
      )}
    </div>
  );
}

export default App;