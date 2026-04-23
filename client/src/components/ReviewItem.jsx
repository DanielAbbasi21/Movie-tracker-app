import { useState } from "react";

function ReviewItem({ review, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleUpdate = () => {
    if (rating < 1 || rating > 10) {
      alert("Rating must be between 1 and 10");
      return;
    }

    onUpdate(review._id, { rating, comment });
    setIsEditing(false);
  };

  return (
    <div className="review-card">
      <h3>{review.movieId.title}</h3>
      <p><strong>User:</strong> {review.userId.username}</p>

      {isEditing ? (
        <>
          <input value={rating} onChange={(e) => setRating(e.target.value)} />
          <input value={comment} onChange={(e) => setComment(e.target.value)} />

          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Rating:</strong> {review.rating}</p>
          <p>{review.comment}</p>

          <button onClick={() => setIsEditing(true)}>
            Update
          </button>
        </>
      )}

      <button
        className="danger"
        onClick={() => onDelete(review._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ReviewItem;