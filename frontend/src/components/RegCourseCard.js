import RegCourseCardStyles from "./RegCourseCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Rating from "@mui/material/Rating";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const RegCourseCard = (props) => {
  const userId = cookies.get("currentUser");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const [oldReview, setOldReview] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValue(oldReview.userRating);

    setReview(oldReview.userReview);
    setShow(true);
  };
  const handleChangeRating = async (event) => {
    setValue(event.target.value);
  };

  const handelClick = () => {
    navigate(
      {
        pathname: "/preReg",
        search: `courseId=${props.data._id}`,
      }, 
    );
  };

  //------------------
  const setRating = async (event) => {
    event.preventDefault();

    //check if he already done it before
    if (oldReview) {
      const bodyUpdate = {
        courseId: props.data._id,
        userId: userId,
        userRating: value,
        userReview: review,
        currentRating: oldReview.userRating,
      };
      try {
        const res = axios.patch("/course/updateRating", bodyUpdate);
      } catch (err) {
        console.log(err);
      }
    } else {
      const body = {
        courseId: props.data._id,
        userId: userId,
        userRating: value,
        userReview: review,
      };
      try {
        const res = axios.post("/course/setRating", body);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    props.data.reviews.map((review) => {
      if (review.userId == userId) {
        setOldReview(review);
      }
    });
  }, []);
  return (
    <div className={RegCourseCardStyles["regcard"]}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Rating name="rating" value={value} onChange={handleChangeRating} />
          <Form.Control
            required
            placeholder="write review for the course.."
            type="text"
            name="review"
            onChange={(e) => setReview(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={setRating}>
            save changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //----------- */}
      <button onClick={handelClick}>
        <div className={RegCourseCardStyles["regcard__image"]}>
          <img src={props.data.imgUrl} alt="course" onClick={handelClick} />
        </div>
        <div className={RegCourseCardStyles["cardheader"]}>
          {props.data.title}
        </div>
        <div className={RegCourseCardStyles["cardfooter"]}>
          {props.data.instructorname}
        </div>
        <ProgressBar
          now={props.progress}
          className={RegCourseCardStyles["progressbar"]}
        ></ProgressBar>
        <div>
          <label className={RegCourseCardStyles["progresslabel"]}>
            {props.progress} % complete
          </label>
        </div>
      </button>
      <div className={RegCourseCardStyles["end"]}>
        {" "}
        <Rating
          name="rating"
          readOnly
          value={props.courserating}
          className={RegCourseCardStyles["rating"]}
        />
        <button className={RegCourseCardStyles["edit"]} onClick={handleShow}>
          Edit Your rating
        </button>
      </div>
    </div>
  );
};

export default RegCourseCard;
