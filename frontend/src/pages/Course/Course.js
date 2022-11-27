import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "./Course.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Rating from "@mui/material/Rating";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LanguageIcon from "@mui/icons-material/Language";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import axios from "axios";
const Course = () => {
  const [course, setCourse] = useState([]);
  const [show, setShow] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [promotion, setPromotion] = useState(0);
  const [enddate, setEnddate] = useState("");
  const [change, setChange] = useState(false);
  const location = useLocation();
  const courseId = location.state.id;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(course);
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/course/addPromotion?id=${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ promo: promotion, enddate: enddate }),
      });
      setChange(!change);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`/course/${courseId}`);
        setCourse(res.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [change]);

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
                <Rating name="rating" readOnly value={course.rating} />
                <label>({course.ratingCount} ratings)</label>
              </div>
              <label className={styled["instlabel"]}>
                Created by {course.instructorname}
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
              {course.coursePreviewUrl != "" ? (
                <>
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
                  <div className={styled["totalhours"]}>
                    <YouTubeIcon className={styled["icon"]} />
                    <label className={styled["time"]}>
                      {course.totalHoursOfCourse}h 30m Video on demand
                    </label>
                  </div>
                </>
              ) : (
                <h6 style={{ textAlign: "center" }}>
                  <DoNotDisturbIcon /> No Preview Video for this Course
                </h6>
              )}

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
                <div className={styled["price"]}>
                  <label className={styled["time"]}>Free</label>
                </div>
              ) : (
                <>
                  {!window.sessionStorage.getItem("factor") ? (
                    <div>
                      <label className={styled["price"]}>
                        {" "}
                        {course.price} USD{" "}
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
              {course.discount > 0 && (
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
              <button className={styled["buyme"]}>Buy now</button>
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
          <form onSubmit={handleSubmit}>
            <div>Add a Promotion</div>
            <div>
              <span>Amount (%) </span>
              <input
                required
                type="number"
                value={promotion}
                onChange={handlePromo}
              ></input>
            </div>
            <div>
              <span>End Date </span>

              <input
                required
                type="date"
                value={enddate}
                onChange={handleEnddate}
              ></input>
            </div>
            <button type="submit">submit</button>
          </form>
        </div>
      )}
      ;
    </>
  );
};

export default Course;
