import style from "../../components/CoursePreview.module.css";
import Rating from "@mui/material/Rating";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import UploadIcon from "@mui/icons-material/Upload";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
const UPLOAD_URL = "/instructor/updatePreview"
const CoursePreInst = (props) => {
  const course = props.course;
  const [show, setShow] = useState(false);
  const [coursePreviewUrl, setCoursePreviewUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave =async ()=>{
       let config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const data= {
            courseId : course._id,
            coursePreviewUrl: coursePreviewUrl,
        }
        await axios.patch(UPLOAD_URL, data, config).then((response) => {
            console.log(response);
            window.location.reload();
          }, (error) => {
            console.log(error);
          });;
  }
  return (
    <div className={style["mainRight"]}>
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
          <Button variant="dark"  onClick={handleShow}>
          <EditIcon/> Edit Course Preview Video
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
            <Button variant="dark"  onClick={handleShow}>
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
                <Button variant="primary" onClick={handleSave}>
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
      <Button variant="dark"  >
      <EditIcon/> Edit Course Description
            </Button>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>Subject</h3>
      <p>{course.subject}</p>
      <Button variant="dark"  >
      <EditIcon/> Edit Subject
            </Button>
      <hr className={style["mainRight-hr"]}></hr>
      <h3>Course Rating</h3>
      <Rating
        name="rating"
        readOnly
        value={course.rating}
        className={style["rating"]}
      />
    </div>
  );
};

export default CoursePreInst;
