import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "./Course.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import StarsIcon from "@mui/icons-material/Stars";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Modal from "react-bootstrap/Modal";
import LanguageIcon from "@mui/icons-material/Language";
import SubjectIcon from "@mui/icons-material/Subject";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Cookies from "universal-cookie";
import axios from "axios";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
const cookies = new Cookies();
const Course = () => {
  const navigate = useNavigate();
  const state = cookies.get("status");
  const [show, setShow] = useState(false);
  const [paid, setPaid] = useState(false);
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const traineeId = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get("cid");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigateCheckout = async () => {
    if (state == 0) {
      try {
        const res = await axios.post(
          "/individualtrainee/create-checkout-session",
          { courseId: courseId }
        );
        const url = res.data.url;
        window.location.href = url;
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/signUp");
    }
  };
  const navigateRequestAccess = async () => {
    const url = "/individualtrainee/requestAccess";
    const body = {
      traineeId: traineeId,
      courseId: courseId,
    };
    try {
      const res = await axios.post(url, body);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/course/${courseId}`);
        setCourse(res.data.firstField);
        setInstructor(res.data.firstField.instructor);
        if (res.data.thirdField) {
          setPaid(true);
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={styled["course"]}>
          <section className={styled["mainSection"]}>
            <section className={styled["mainSection-left"]}>
              <h1>{course.title}</h1>
              <h2>{course.description}</h2>
              <div className={styled["mainSection-left-rating"]}>
                <Rating
                  name="rating"
                  readOnly
                  value={Math.round(course.rating / course.ratingCount)}
                />
                <label>
                  ({course.ratingCount - 1} ratings) {course.studentCount}{" "}
                  students{" "}
                </label>
              </div>
              <label className={styled["instlabel"]}>
                Created by {instructor.firstname} {instructor.lastname}
              </label>

              <div className={styled["mainSection-left-language"]}>
                <LanguageIcon style={{ color: "white", fontSize: "1rem" }} />
                <label>&nbsp;{course.language}</label>
              </div>
              <div className={styled["mainSection-left-language"]}>
                <SubjectIcon style={{ color: "white", fontSize: "1rem" }} />
                <label>&nbsp;{course.subject}</label>
              </div>
              <div className={styled["mainSection-left-language"]}>
                <UpgradeIcon style={{ color: "white", fontSize: "1rem" }} />
                <label>
                  &nbsp;Last updated at 19/4/2019{" "}
                  {/*course.updatedAt.split("T")[0]*/}
                </label>
              </div>
            </section>
            <section className={styled["mainSection-right"]}>
              <iframe
                width="100%"
                src={course.coursePreviewUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button className={styled["preview"]} onClick={handleShow}>
                &nbsp;preview this course
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Course Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>will preview here the course content</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    close
                  </Button>
                </Modal.Footer>
              </Modal>
              {course.price === 0
                ? state != 2 && (
                    <div className={styled["price"]}>
                      <label className={styled["time"]}>Free</label>
                    </div>
                  )
                : state != 2 && (
                    <>
                      {!window.sessionStorage.getItem("factor") ? (
                        <div>
                          <label className={styled["price"]}>
                            {" "}
                            {course.price -
                              (course.price * course.discount) / 100}{" "}
                            USD{" "}
                          </label>
                          <label className={styled["discount"]}>
                            &nbsp;
                            {course.discount > 0
                              ? `${course.discount}% off`
                              : ""}
                          </label>
                        </div>
                      ) : (
                        <div className={styled["price"]}>
                          <label className={styled["time"]}>
                            {Math.floor(
                              course.price *
                                window.sessionStorage.getItem("factor")
                            )}{" "}
                            {window.sessionStorage
                              .getItem("currency")
                              .toUpperCase()}
                          </label>
                        </div>
                      )}
                    </>
                  )}
              {course.discount > 0 && state != 2 && (
                <div>
                  <AccessAlarmIcon
                    style={{ color: "red" }}
                    className={styled["enddate"]}
                  />{" "}
                  <label className={styled["enddatelabel"]}>
                    Discount ends at {course.discount_enddate.split("T")[0]}
                  </label>
                </div>
              )}
              {state != 1 && !paid && (
                <button
                  className={styled["buyme"]}
                  onClick={
                    state == 2 ? navigateRequestAccess : navigateCheckout
                  }
                >
                  {state == 2 ? "request access" : "Buy now"}
                </button>
              )}
              {(paid) && (
                <button className={styled["buyme"]}>Go to course</button>
              )}
            </section>
          </section>
          <section className={styled["middle"]}>
            <section className={styled["middle-left"]}>
              <section className={styled["middle-top"]}>
                <label>Description</label>
                <h2>{course.description}</h2>
              </section>
              <section className={styled["middle-bottom"]}>
                <label>Course Content</label>
                <p>
                  {course.subtitles?.length} sections . {course.numberOfItems}{" "}
                  lectures{" "}
                </p>
                {course.subtitles && (
                  <Accordion defaultActiveKey="0" alwaysOpen>
                    {course.subtitles.map((subtitle, index) => (
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          <h5>
                            Section {index + 1}: {subtitle.subtitle}
                          </h5>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup>
                            {subtitle.link?.map((link, index) => (
                              <ListGroup.Item>
                                {index + 1}.{" "}
                                {link.allowed ? (
                                  <Link
                                    to={link.linkUrl}
                                    style={{ color: "#a00407" ,textDecoration:"none"}}
                                  >
                                    {" "}
                                    {link.linkDesc}{" "}
                                  </Link>
                                ) : (
                                  <Link className={styled["isDisabled"]}>
                                    {" "}
                                    {link.linkDesc}
                                  </Link>
                                )}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                )}
              </section>
              <section className={styled["middle-bottom"]}>
                <label>Instructors</label>
                <p className={styled["middle-bottom-content-label1"]}>
                  <Link
                    to={`/previewProfile?id=${instructor._id}`}
                    style={{ color: "#a00407", textDecoration: "none" }}
                  >
                    {instructor.firstname} {instructor.lastname}
                  </Link>
                </p>
                <div className={styled["middle-bottom-content"]}>
                  <div>
                    <img
                      src={instructor.imgUrl}
                      alt={instructor.username}
                    ></img>
                  </div>

                  <div className={styled["middle-bottom-content-right"]}>
                    <div>
                      {" "}
                      <StarsIcon></StarsIcon>
                      <label>
                        {instructor.rating / instructor.ratingCount} Instructor
                        Rating
                      </label>
                    </div>
                    <div>
                      {" "}
                      <ReviewsIcon></ReviewsIcon>
                      <label>
                        {instructor.reviews ? instructor.reviews.length : 0}{" "}
                        Reviews
                      </label>
                    </div>
                    <div>
                      {" "}
                      <PlayCircleFilledWhiteIcon />
                      <label>
                        {instructor.courseList
                          ? instructor.courseList.length
                          : 0}{" "}
                        Courses
                      </label>
                    </div>
                  </div>
                </div>
                <p className={styled["middle-bottom-content-label2"]}>
                  {instructor.mini_bio?.slice(0,500)}
                </p>
              </section>
            </section>
            <section className={styled["middle-right"]}>
              <label>This course includes :</label>
              <ListGroup variant="flush">
                <ListGroup.Item><OndemandVideoIcon style={{marginRight:'0.5rem'}}/> hours on-demand video</ListGroup.Item>
                <ListGroup.Item><SubjectIcon style={{marginRight:'0.5rem'}}/>{course.subtitles?.length} sections </ListGroup.Item>
                <ListGroup.Item><SchoolIcon  style={{marginRight:'0.5rem'}}/>{course.numberOfItems} lectures</ListGroup.Item>
                <ListGroup.Item><AllInclusiveIcon style={{marginRight:'0.5rem'}}/>Full lifetime access </ListGroup.Item>
                <ListGroup.Item><EmojiEventsIcon style={{marginRight:'0.5rem'}}/>Certificate of completion</ListGroup.Item>
              </ListGroup>
            </section>
          </section>
        </div>
      )}
      ;
    </>
  );
};

export default Course;
