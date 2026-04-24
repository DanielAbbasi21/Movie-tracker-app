import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, onDelete, onUpdate, showActions }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <ReviewItem
          key={review._id}
          review={review}
          onDelete={onDelete}
          onUpdate={onUpdate}
          showActions={showActions}
        />
      ))}
    </div>
  );
}

export default ReviewList;