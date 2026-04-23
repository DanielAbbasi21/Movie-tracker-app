import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
}

export default ReviewList;