import style from "../../components/CourseContent.module.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useState } from "react";
let UPLOAD_URL = "/instructor/updateSubtitle";
const CourseConInst = (props) => {
  const subtitles = props.course.subtitles;
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinKDesc] = useState("");
  const [subId, setSubId] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlehelper = (id) => {
    setSubId(id);
    handleShow();
  };
  const handleCheckBox = (event)=>{
    if (event.target.checked) {
        setAllowed(true)
      } else {
        setAllowed(false)
  
      }
  }
  const handleSave = async () => {
    const data = {
      courseId: props.course._id,
      subId: subId,
      linkUrl: linkUrl,
      linkDesc: linkDesc,
      allowed :allowed
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.patch(UPLOAD_URL, data, config).then(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Course Content</label>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload video </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon3">youtube Url</InputGroup.Text>
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Text id="basic-addon3">
              Video Description
            </InputGroup.Text>
            <Form.Control
              id="basic-url"
              aria-describedby="basic-addon3"
              onChange={(e) => setLinKDesc(e.target.value)}
            />
          </InputGroup>
          <Form.Check 
            type='checkbox'
            label="Allow for Guests"
            onClick={handleCheckBox}
          />
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
      <Accordion defaultActiveKey="0" className={style["subtitles"]} >
        {subtitles.map((subtitle, index) => (
          <Accordion.Item eventKey={index}>
            <Accordion.Header>
            <h5>Section {index + 1}: {subtitle.subtitle}</h5>
            </Accordion.Header>
            <Accordion.Body>
              <div className={style["accordation-body"]}>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handlehelper(subtitle._id)}
                >
                  <UploadIcon /> Upload Video
                </Button>
                <ListGroup>
                  {subtitle.link?.map((link, index) => (
                    <ListGroup.Item>
                      {index + 1}. <a href={link.linkUrl}> {link.linkDesc}</a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseConInst;
