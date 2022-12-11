import style from "../../components/CoursePreview.module.css";
import regStyles from "../Course/RegCourse.module.css"
import Rating from "@mui/material/Rating";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CircleIcon from "@mui/icons-material/Circle";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard";
import MyCourseInst from "./MyCourseInst";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import CoursePromo from "./CoursePromo";
const UPLOAD_URL = "/instructor/updatePreview";
const CoursePreInst = () => {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get('courseId');;
  const [isloading, setIsLoading] = useState(false);
  const [course, setCourse] = useState([]);
  const [coursePreviewUrl, setCoursePreviewUrl] = useState("");
  const [show, setShow] = useState(false);
  const [showRatings, setShowRating] = useState(false);
  const [reviews, setReviews] = useState([]);
  const handleClose = () => setShow(false);
  const handleCloseRatings = () => setShowRating(false);
  const handleShow = () => setShow(true);
  const handleShowRatings = () => {setReviews(reviews);setShowRating(true);};
  const handleSave = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      courseId: course._id,
      coursePreviewUrl: coursePreviewUrl,
    };
    await axios.patch(UPLOAD_URL, data, config).then(
      (response) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);  });};
      const fetchdata = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(`/course/${course_id}`);
          setCourse(res.data.firstField);
          setReviews(res.data.secondField);
          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
      };
      useEffect(()=>{
        fetchdata();
      },[]);
  return (
    <>
    {isloading ? (
      <LoadingScreen loading={true} logoSrc={spinner} />
    ) : (
    <div className={regStyles["mainreg"]}>
    <MyCourseInst course_id={course_id} course_img={course.imgUrl} course_title={course.title} course_inst={course.instructorname} name={'preview'}/>
    <div className={style["mainRight"]}>
      <Modal show={showRatings} onHide={handleCloseRatings}>
        <Modal.Header closeButton>
          <Modal.Title>Course Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className={style["rating-box"]}>
                  {reviews.filter((review, idx) => idx < 5)
                    .map((review,index) => {
                      return (
                        <ReviewCard
                          index = {index}
                          username={review.userId.username}
                          rating={review.userRating}
                          review={review.userReview}
                        ></ReviewCard>
                      );
                    })}
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRatings}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
      <label className={style["mainlabel"]}>Course Preview</label>
      <h1>Welcome to the {course.title} Course</h1>
      <div className={style["video"]}>
        {course.coursePreviewUrl != "" ? (
          <>
            <iframe
              width="1000"
              height="500"
              src={course.coursePreviewUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Button  onClick={handleShow} style={{borderRadius:'0',border:'none',backgroundColor:'#a00407'}}>
              <EditIcon /> Edit Course Preview Video
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Course Preview </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon3">
                    youtube Url
                  </InputGroup.Text>
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={(e) => setCoursePreviewUrl(e.target.value)}
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  save changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <div className={style["notFound"]}>
            <h6 style={{ textAlign: "center" }}>
              <DoNotDisturbIcon /> No Preview Video for this Course
            </h6>
            <Button variant="dark" onClick={handleShow}>
              <UploadIcon /> Upload Video from Youtube
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Upload Course Preview </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon3">
                    youtube Url
                  </InputGroup.Text>
                  <Form.Control
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={(e) => setCoursePreviewUrl(e.target.value)}
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  close
                </Button>
                <Button  onClick={handleSave}>
                  save changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>About this course</h3>
      <p>{course.description}</p>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>Subject</h3>
      <p>{course.subject}</p>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>Define promotion</h3>
      <CoursePromo course_id={course_id}></CoursePromo>
      <hr className={style["mainRight-hr"]}></hr>
      <div className={style["mainRight-rating"]}>
        <h3>
          <Rating
            name="rating"
            readOnly
            value={!course.rating ? 0 : Math.round(course.rating/course.ratingCount)}
            className={style["rating"]}
          />{" "}
          {Math.round(course.rating/course.ratingCount)} course rating{" "}
          <CircleIcon style={{ fontSize: "0.5rem" }} /> ({course.ratingCount-1}{" "}
          ratings)
        </h3>
        <div className={style["rating-box"]}>
                  {reviews.filter((review, idx) => idx < 5)
                    .map((review,index) => {
                      return (
                        <ReviewCard
                          index = {index}
                          username={review.userId.username}
                          rating={review.userRating}
                          review={review.userReview}
                        ></ReviewCard>
                      );
                    })}
                </div>
        <Button
          onClick={handleShowRatings}
          style={{backgroundColor:'#a00407',borderRadius: 0, width: '10rem' ,border: 'none' }}
          >
          show all reviews
        </Button>
      </div>
    </div>
    </div>)} </>
  );
};

export default CoursePreInst;
