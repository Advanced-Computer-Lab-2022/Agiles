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
import courseContent from "../../static/courseContent.svg";
import Badge from "react-bootstrap/Badge";

let UPLOAD_URL = "/instructor/updateSubtitle";
const CourseConInst = () => {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get("courseId");
  const [course, setCourse] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [average, setAverage] = useState([]);
  const [averageFinal, setAverageFinal] = useState(0);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinKDesc] = useState("");
  const [subId, setSubId] = useState("");
  const [duration, setDuration] = useState("");
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

  const getAverage = async () => {
    try {
      console.log(course_id);
      const body = {
        courseId: course_id,
        final: false,
      };
      const res = await axios.post("/instructor/getAverageGrage", body);
      setAverage(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getFinalAvrage = async() => {
    try {
      const body = {
        courseId: course_id,
        final: true,
      };
      const res = await axios.post("/instructor/getAverageGrage", body);
      setAverageFinal(res.data);
    } catch (e) {
      console.log(e);
    }

  };

  const handleSave = async () => {
    const data = {
      courseId: course_id,
      subId: subId,
      linkUrl: linkUrl,
      linkDesc: linkDesc,
      duration: duration,
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
      (e) => {
        console.log(e);
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
    getAverage();
    getFinalAvrage();
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
            <div className={style["main-right-left"]}>
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
                  <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon3">
                      Duratuion
                    </InputGroup.Text>
                    <Form.Control
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) => setDuration(e.target.value)}
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
              <Accordion
                defaultActiveKey="0"
                className={style["subtitles"]}
                flush
              >
                {subtitles.length > 0 &&
                  subtitles.map((subtitle, index0) => (
                    <Accordion.Item eventKey={index0} key={index0}>
                      <Accordion.Header>
                        <h5 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                          Section {index0 + 1}: {subtitle.subtitle}
                        </h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className={style["accordation-body"]}>
                          <Button
                            id={subtitle._id}
                            size="sm"
                            style={{
                              backgroundColor: "#a00407",
                              borderRadius: 0,
                              width: "10rem",
                              border: "none",
                              marginBottom: "1rem",
                            }}
                            onClick={handleUpload}
                          >
                            <UploadIcon /> Upload Video
                          </Button>
                          <ListGroup>
                            {subtitle.link?.map((link, index1) => (
                              <ListGroup.Item
                                key={index1}
                                className="list-group-item list-group-item-action"
                              >
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
                            <ListGroup.Item className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                              <button
                                onClick={() => {
                                  route(subtitle._id);
                                }}
                                className={style["subtitleView"]}
                              >
                                Set Quiz
                              </button>
                              <h5>
                                <Badge
                                  bg="primary"
                                  className={style["gradeBadge"]}
                                  pill
                                >
                                  {" "}
                                  Average Grade :{" "}
                                  {average?.find(
                                    (item) => item._id === subtitle._id
                                  )
                                    ? average?.find(
                                        (item) => item._id === subtitle._id
                                      )?.average
                                    : 0}
                                </Badge>
                              </h5>
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
              </Accordion>
              <div style={{display:'flex'}}>
                <Badge style = {{margin:'20px auto'}}bg="primary" className={style["gradeBadge"]} pill>
                  {" "}
                  Average Final Exam Grade :{" "}{averageFinal}
                </Badge>
              </div>
            </div>
            <div className={style["main-right-right"]}>
              <img src={courseContent} alt="courseContent" width="400px"></img>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseConInst;
