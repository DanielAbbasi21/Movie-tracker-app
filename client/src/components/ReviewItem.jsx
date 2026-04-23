function ReviewItem({ review }) {
  return (
    <div>
      <h3>{review.movieId.title}</h3>
      <p>User: {review.userId.username}</p>
      <p>Rating: {review.rating}</p>
      <p>{review.comment}</p>
      <hr />
    </div>
  );
}

export default ReviewItem;