import RegCourseCardStyles from "./RegCourseCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Rating from "@mui/material/Rating";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const RegCourseCard = (props) => {
  const userId = cookies.get("currentUser");
  const index=props.index;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [review, setReview] = useState("");
  const [oldReview, setOldReview] = useState([]);
  const [courseRating,setCourseRating] = useState(props.courseRating);
  const [value, setValue] = useState(courseRating);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValue(courseRating);
    setShow(true);
  };
  const handleChangeRating = async (event) => {
    setValue(event.target.value);
  };

  const handelClick = () => {
    navigate(
      {
        pathname: "/preReg",
        search: `courseId=${props.data._id}&idx=${index}`,
      }
    );
  };

  //------------------
  const setRating = async (event) => {
    event.preventDefault();
      const body = {
        courseId: props.data._id,
        userId: userId,
        userRating: value,
        userReview: review,
      };
      try {
        const res = axios.post("/course/setRating", body);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "updated succesfully",
        });
        setCourseRating(value);
        setShow(false)
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Server error!",
        });
      }
    }
    useEffect(()=>{

    },[courseRating])
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
            style = {{height:'5rem'}}
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
          value={courseRating?courseRating:0}
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
