import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
const ReviewCard = (props) => {
  const index = props.index;
  const username = props.username;
  const rating = props.rating;
  const review = props.review;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{index+1}. {username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Rating
            name="rating"
            readOnly
            value={!rating ? 0 : rating}
          />
        </Card.Subtitle>
        <Card.Text>{review}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
