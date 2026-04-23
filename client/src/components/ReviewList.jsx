import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, onDelete }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ReviewList;