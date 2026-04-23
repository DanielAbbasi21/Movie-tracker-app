import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, onDelete, onUpdate }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default ReviewList;