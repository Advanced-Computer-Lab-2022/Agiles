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
import UpgradeIcon from "@mui/icons-material/Upgrade";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
const Course = () => {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const state = cookies.get("status");
  const traineeId = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get("cid");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigateCheckout = async() => {
    if (state == 0) {
      try{
       const res = await axios.post("/individualtrainee/create-checkout-session", {courseId : courseId});
       const url = res.data.url;
       window.location.href=url;
      }
      catch(err){
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
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(url, body, config);
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
              {course.price === 0 ? (
                state==0&&
                <div className={styled["price"]}>
                  <label className={styled["time"]}>Free</label>
                </div>
              ) : (
                state==0&&
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
                        {course.discount > 0 ? `${course.discount}% off` : ""}
                      </label>
                    </div>
                  ) : (
                    <div className={styled["price"]}>
                      <label className={styled["time"]}>
                        {Math.floor(
                          course.price * window.sessionStorage.getItem("factor")
                        )}{" "}
                        {window.sessionStorage
                          .getItem("currency")
                          .toUpperCase()}
                      </label>
                    </div>
                  )}
                </>
              )}
              {course.discount > 0 && state==0&& (
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
              {state!=1&&
              <button
                className={styled["buyme"]}
                onClick={state==2 ? navigateRequestAccess : navigateCheckout}
              >
                {state == 2 ? "request access" : "Buy now"}
              </button>}
            </section>
          </section>
          <section className={styled["middle-top"]}>
            <label>Description</label>
            <h2>{course.description}</h2>
          </section>
          <section className={styled["middle-top"]}>
            <label>Subject</label>
            <h2>{course.subject}</h2>
          </section>
          <section className={styled["middle-bottom"]}>
            <label>Course Content</label>
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
                      <YouTubeIcon /> {subtitle.time}
                      <ListGroup>
                        {subtitle.link?.map((link, index) => (
                          <ListGroup.Item>
                            {index + 1}.{" "}
                            {link.allowed ? (
                              <a href={link.linkUrl}> {link.linkDesc}</a>
                            ) : (
                              <a className={styled["isDisabled"]}>
                                {" "}
                                {link.linkDesc}
                              </a>
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
              <Link to={`/previewProfile?id=${instructor._id}`} style={{color:'#a00407',textDecoration:'none'}}>
                {instructor.firstname} {instructor.lastname}
              </Link>
            </p>
            <div className={styled["middle-bottom-content"]}>
              <div>
                <img src={instructor.imgUrl} alt={instructor.username}></img>
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
                    {instructor.reviews ? instructor.reviews.length : 0} Reviews
                  </label>
                </div>
                <div>
                  {" "}
                  <PlayCircleFilledWhiteIcon />
                  <label>
                    {instructor.courseList ? instructor.courseList.length : 0}{" "}
                    Courses
                  </label>
                </div>
              </div>
            </div>
            <p className={styled["middle-bottom-content-labe2"]}>
              {instructor.mini_bio}
            </p>
          </section>
        </div>
      )}
      ;
    </>
  );
};

export default Course;
