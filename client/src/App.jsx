import { useEffect, useState } from "react";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reviews")
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <div>
      <h1>Reviews</h1>

      {reviews.map((review) => (
        <div key={review._id}>
          <h3>{review.movieId.title}</h3>
          <p>User: {review.userId.username}</p>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;