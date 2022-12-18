import style from "./CoursePreview.module.css";
import regStyles from "../pages/Course/RegCourse.module.css";
import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CircleIcon from "@mui/icons-material/Circle";
import ProgressBar from "react-bootstrap/ProgressBar";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import RegCourse from "../pages/Course/RegCourse";
import InstructorRating from "../pages/Course/InstructorRating";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const CoursePreview = () => {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get("courseId");
  const index = new URLSearchParams(location.search).get("idx");
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]);
  const [instId, setInstId] = useState(0);
  const [instRating, setInstRating] = useState(0);
  const [instReview, setInstReview] = useState("");
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setReviews(data.secondField);
    setShow(true);
  };
  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("individualtrainee/inprogressCourse", {
        courseId: course_id,
      });
      const items = await axios.post("individualtrainee/getAllItems", {
        courseId: course_id,
      });
      setData(res.data);
      setReviews(res.data.secondField);
      setProgress(
        Math.floor(
          (res.data.firstField.registered_courses[index].progress /
            items.data.numberOfItems) *
            100
        )
      );
      setCourse(res.data.firstField.registered_courses[index].courseId);
      setInstId(
        res.data.firstField.registered_courses[index].courseId.instructor
      );
      if (res.data.firstField.registered_courses[index].instRating) {
        setInstRating(
          res.data.firstField.registered_courses[index].instRating.userRating
        );
        setInstReview(
          res.data.firstField.registered_courses[index].instRating.userReview
        );
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={regStyles["mainreg"]}>
          <RegCourse
            course_id={course_id}
            course_img={course.imgUrl}
            progress={progress}
            course_title={course.title}
            course_inst={course.instructorname}
            name={"preview"}
            idx={index}
          />
          <div className={style["mainRight"]}>
            <Modal show={show} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Course Reviews</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={style["rating-box"]}>
                  {reviews
                    .filter((review, idx) => idx < 5)
                    .map((review, index) => {
                      return (
                        <ReviewCard
                          index={index}
                          username={review.userId.username}
                          rating={review.userRating}
                          review={review.userReview}
                        ></ReviewCard>
                      );
                    })}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  close
                </Button>
              </Modal.Footer>
            </Modal>
            <label className={style["mainlabel"]}>Overview</label>
            <ProgressBar
              now={progress}
              className={style["progressbar"]}
            ></ProgressBar>
            <h1>Welcome to the {course.title} Course</h1>
            <div className={style["video"]}>
              {course.coursePreviewUrl != "" ? (
                <iframe
                  width="1000"
                  height="500"
                  src={course.coursePreviewUrl}
                  title="YouTube video player"
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
            <p>
              Description : {course.description}
              <br></br>
              <span>Subject : {course.subject}</span>
            </p>
            <hr className={style["mainRight-hr"]}></hr>
            <h3>Rate Instructor</h3>
            <InstructorRating
              id={instId}
              instRating={instRating}
              courseId={course_id}
              instReview={instReview}
            />
            <hr className={style["mainRight-hr"]}></hr>
            <div className={style["mainRight-rating"]}>
              <h3>
                <Rating
                  name="rating"
                  readOnly
                  value={
                    !course.rating
                      ? 0
                      : Math.round(course.rating / course.ratingCount)
                  }
                  className={style["rating"]}
                />{" "}
                <span>
                  {Math.round(course.rating / course.ratingCount)} course rating{" "}
                  <CircleIcon style={{ fontSize: "0.5rem" }} /> (
                  {course.ratingCount - 1} ratings)
                </span>
              </h3>
              <div className={style["rating-box"]}>
                {reviews
                  .filter((review, idx) => idx < 5)
                  .map((review, index) => {
                    return (
                      <ReviewCard
                        index={index}
                        username={review.userId.username}
                        rating={review.userRating}
                        review={review.userReview}
                      ></ReviewCard>
                    );
                  })}
              </div>
              <Button
                onClick={handleShow}
                style={{
                  backgroundColor: "#a00407",
                  borderRadius: 0,
                  width: "10rem",
                  border: "none",
                }}
              >
                show all reviews
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePreview;
