import RegCourseCardStyles from "./RegCourseCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RegCourseCard = (props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(props.courserating);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeRating = async (event) => {
    setValue(event.target.value);
  };
  const handelClick = ()=>{
    navigate({
      pathname: "/regcourse",
      search: `?course=${props.data.title}`,
      
    },{state: { course: props.data , progress: props.progress }});
  }
  return (
    <div className={RegCourseCardStyles["regcard"]}>
      <button>
      <div className={RegCourseCardStyles["regcard__image"]}>
        <img
          src={props.data.imgUrl}
          alt="course"
          onClick={handelClick}
        />
      </div>
      <div className={RegCourseCardStyles["cardheader"]}>{props.data.title}</div>
      <div className={RegCourseCardStyles["cardfooter"]}>{props.data.instructorname}</div>
      <ProgressBar
        now={props.progress}
        className={RegCourseCardStyles["progressbar"]}
      ></ProgressBar>
      <div>
      <label className={RegCourseCardStyles["progresslabel"]}>
        {props.progress} % complete
      </label>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Rating name="rating"  value={value} onChange={handleChangeRating}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            save changes
          </Button>
        </Modal.Footer>
      </Modal>
      </button>
      <div className={RegCourseCardStyles['end']}> <Rating name="rating" readOnly value={props.courserating} className={RegCourseCardStyles["rating"]} />
      <button className={RegCourseCardStyles["edit"]} onClick={handleShow}>
        Edit Your rating
      </button></div>
     
    </div>
  );
};

export default RegCourseCard;
