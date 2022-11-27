import style from "./CoursePreview.module.css";
import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CircleIcon from "@mui/icons-material/Circle";
import ProgressBar from "react-bootstrap/ProgressBar";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useState } from "react";
import ReviewCard from "./ReviewCard";
const CoursePreview = (props) => {
  const course = props.course;
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setReviews(props.course.reviews);
    setShow(true);
  };
  return (
    <div className={style["mainRight"]}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Reviews
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={style["rating-box"]}>
          {reviews.filter((review,idx)=>idx<5).map(review =>{
            return <ReviewCard  userId={review.userId} rating ={review.userRating} review = {review.userReview}></ReviewCard>
          })}
          
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
      <label className={style["mainlabel"]}>Course Preview</label>
      <ProgressBar
        now={props.progress}
        className={style["progressbar"]}
        label={`${props.progress}% completed`}
      ></ProgressBar>
      <h1>Welcome to the {course.title} Course</h1>
      <div className={style["video"]}>
        {course.coursePreviewUrl != "" ? (
          <iframe
            width="1000"
            height="500"
            src={course.coursePreviewUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <h6 style={{ textAlign: "center" }}>
            <DoNotDisturbIcon /> No Preview Video for this Course
          </h6>
        )}
      </div>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>About this course</h3>
      <p>{course.description}</p>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>Subject</h3>
      <p>{course.subject}</p>
      <hr className={style["mainRight-hr"]}></hr>
      <div className={style["mainRight-rating"]}>
        <h3>
          <Rating
            name="rating"
            readOnly
            value={!course.rating ? 0 : course.rating}
            className={style["rating"]}
          />{" "}<span>
          {course.rating} course rating{" "}
          <CircleIcon style={{ fontSize: "0.5rem" }} /> ({course.ratingCount}{" "}
          ratings)</span>
        </h3>
        <Button
            variant="light"
            onClick={handleShow}
            style={{ border: "1px solid black" ,width:'13%'}}
          >
            show all reviews
          </Button>
      </div>
    </div>
  );
};

export default CoursePreview;
