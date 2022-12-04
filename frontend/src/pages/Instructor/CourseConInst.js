import style from "../../components/CourseContent.module.css";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import UploadIcon from "@mui/icons-material/Upload";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MyCourseInst from "./MyCourseInst";
import regStyles from "../Course/RegCourse.module.css";
let UPLOAD_URL = "/instructor/updateSubtitle";
const CourseConInst = () => {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get("courseId");
  const [course, setCourse] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinKDesc] = useState("");
  const [subId, setSubId] = useState("");
  const [subb, setSubb] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpload = (e) => {
    setSubId(e.target.id);
    handleShow();
  };
  const handleClick = (e) => {
    navigate(
      {
        pathname: "/subtitleView",
        search: e.target.id,
      },
      { state: { currentState: e.target.name, data: subtitles } }
    );
  };
  const handleCheckBox = (event) => {
    if (event.target.checked) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  };
  const route = (idd) => {
    navigate(`/setExam?courseId=${course_id}&subtitleId=${idd}`);
  };

  const handleSave = async () => {
    const data = {
      courseId: course_id,
      subId: subId,
      linkUrl: linkUrl,
      linkDesc: linkDesc,
      allowed: allowed,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.patch(UPLOAD_URL, data, config).then(
      (res) => {
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data.firstField);
      setSubtitles(res.data.firstField.subtitles);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
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
          <MyCourseInst
            course_id={course_id}
            course_img={course.imgUrl}
            course_title={course.title}
            course_inst={course.instructorname}
            name={"content"}
          />
          <div className={style["mainRight"]}>
            <label className={style["mainlabel"]}>Course Content</label>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Upload video </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-2">
                  <InputGroup.Text id="basic-addon3">
                    youtube Url
                  </InputGroup.Text>
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
                  type="checkbox"
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
            <Accordion defaultActiveKey="0" className={style["subtitles"]}>
              {subtitles.length > 0 &&
                subtitles.map((subtitle, index0) => (
                  <Accordion.Item eventKey={index0} key={index0}>
                    <Accordion.Header>
                      <h5>
                        Section {index0 + 1}: {subtitle.subtitle}
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className={style["accordation-body"]}>
                        <Button
                          variant="dark"
                          id={subtitle._id}
                          size="sm"
                          style={{ width: "20%" }}
                          onClick={handleUpload}
                        >
                          <UploadIcon /> Upload Video
                        </Button>
                        <ListGroup>
                          {subtitle.link?.map((link, index1) => (
                            <ListGroup.Item key={index1}>
                              {index1 + 1}.{" "}
                              <button
                                id={"linkId=" + link._id}
                                name={index0 + " " + index1}
                                onClick={handleClick}
                                className={style["subtitleView"]}
                              >
                                {link.linkDesc}
                              </button>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </div>
                      <ListGroup>
                        <ListGroup.Item>
                          <button
                            onClick={() => {
                              route(subtitle._id);
                            }}
                            className={style["subtitleView"]}
                          >
                            Set Subtitle Exam
                          </button>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseConInst;
