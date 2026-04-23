import { useEffect, useState } from "react";
import ReviewList from "./components/ReviewList";

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
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default App;