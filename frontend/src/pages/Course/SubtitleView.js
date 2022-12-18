import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./SubtitleView.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Youtube from "react-youtube";
import Cookies from "universal-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import * as React from "react";
import Box from "@mui/material/Box";
import { Content, ContextualHelp, Heading } from "@adobe/react-spectrum";

const LINK_URL = "/course/link/view";
const cookies = new Cookies();
const Subtitle = () => {
  const progress = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search;
  const subtitleId = new URLSearchParams(location.search).get("subtitleId");
  const [link, setLink] = useState({ linkUrl: "", linkDesc: "" });
  const [subtitles, setSubtitles] = useState([]);
  const subtitles2 = location.state.data;
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState([]);
  const [questions, setQuestions] = useState(0);
  const [show, setShow] = useState(false);
  // const [show, setShow] = useState(false);

  const [notes, setNotes] = useState("Blank");
  const downloadPDFFile = () => {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text(20, 20, notes);
    doc.save("myNotes.pdf");
  };

  const saveNotes = async (e) => {
    let res = await axios.patch("/individualtrainee/addNotes", {
      subtitleId: subtitleId,
      notes: notes,
      linkId: link._id,
      courseId: location.state.courseId,
    });
  };
  const getOldNotes = async (e) => {
    console.log(subtitleId);
    let id = new URLSearchParams(location.search).get("linkId");
    console.log(id);
    console.log(location.state.courseId);
    let res = await axios.get("/individualtrainee/getNote", {
      subtitleId: subtitleId,
      linkId: id,
      courseId: location.state.courseId,
    });
    console.log(res);
  };

  const handleNotesChange = (event) => {
    // 👇️ access textarea value
    setNotes(event.target.value);
  };
  const handleClick = async (e) => {
    let res = await axios.post("/individualtrainee/updateLinkProgress", {
      linkId: link._id,
      courseId: location.state.courseId,
      completedItems: 1,
    });
    navigate(
      {
        pathname: "/subtitleView",
        search: e.target.id,
      },
      {
        state: {
          currentState: e.target.name,
          data: subtitles,
          courseId: location.state.courseId,
        },
      }
    );
    window.location.reload();
  };

  const handleClose = () => setShow(false);

  const handleExamClick = async (e) => {
    try {
      const exam = await axios.get(
        `/individualtrainee/getIndividualExerciseGrade?id=${cookies.get(
          "currentUser"
        )}&subtitleId=${e.target.id}`
      );
      if (exam.data == null) {
        navigate(
          {
            pathname: "/courseExam",
            search:
              "?subtitleId=" +
              e.target.id +
              "&studentId=" +
              cookies.get("currentUser") +
              "&courseId=" +
              location.state.courseId,
          },
          { state: { final: "false" } }
        );
      } else {
        setShow(true);
        setGrade(exam.data.result);
        setQuestions(exam.data.studentChoices.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFinalExamClick = async (e) => {
    try {
      const exam = await axios.get(
        `/individualtrainee/getFinalExamGrade?studentId=${cookies.get(
          "currentUser"
        )}&courseId=${location.state.courseId}`
      );

      if (exam.data === null) {
        navigate(
          {
            pathname: "/courseExam",
            search:
              "&studentId=" +
              cookies.get("currentUser") +
              "&courseId=" +
              location.state.courseId,
          },
          { state: { final: "true" } }
        );
      } else {
        setShow(true);
        setGrade(exam.data.result);
        setQuestions(exam.data.studentChoices.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleProgress = async (event) => {
    let progresser = 0;
    if (event.data == 1) {
      progress.current = setInterval(async () => {
        const player = event.target;
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        progresser = Math.floor((currentTime / duration) * 100);
        if (progresser >= 80) {
          progresser = 100;
        }
        let res = await axios.post("/individualtrainee/updateLinkProgress", {
          linkId: link._id,
          courseId: location.state.courseId,
          completedItems: progresser,
        });
      }, 5000);
    } else if (event.data == 2 || event.data == 0) {
      const player = event.target;
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      progresser = Math.floor((currentTime / duration) * 100);
      if (progresser >= 80) {
        progresser = 100;
      }
      let res = await axios.post("/individualtrainee/updateLinkProgress", {
        id: cookies.get("currentUser"),
        courseId: location.state.courseId,
        completedItems: progresser,
      });
    }
    return () => {
      clearInterval(progress.current);
    };
  };

  const FetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(LINK_URL + query);
      console.log("link: " + res.data);
      setLink(res.data);
      setSubtitles(location.state.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    FetchData();

    return () => {
      clearInterval(progress.current);
    };
  }, []);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main-section"]}>
          <section className={style["main-section-left"]}>
            <section className={style["main-section-left-top"]}>
              <Youtube
                videoId={link.linkUrl.substring(30, 41)}
                opts={{
                  width: "800",
                  height: "450",
                  title: "YouTube video player",
                  frameBorder: "0",
                  allow:
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  playerVars: {
                    fs: 1,
                    autoplay: 1,
                  },
                }}
                onStateChange={handleProgress}
              />
            </section>
            <section className={style["main-section-left-bottom"]}>
              <h3>Short Summary</h3>

              <p>{link.linkDesc}</p>
              <hr className={style["mainRight-hr"]}></hr>
            </section>
            <section className={style["main-section-left-bottom"]}>
              <h3>Notes</h3>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Write Your Notes Here
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="8"
                  value={notes}
                  onChange={handleNotesChange}
                ></textarea>
                <div>
                  <button onClick={downloadPDFFile}>Download Notes</button>
                  <button onClick={saveNotes}>save Notes</button>
                </div>
              </div>
            </section>
          </section>
          <section className={style["main-section-right"]}>
            <Accordion alwaysOpen className={style["subtitles"]}>
              {subtitles &&
                subtitles.map((subtitle, index0) => (
                  <Accordion.Item eventKey={index0} key={index0}>
                    <Accordion.Header>
                      <h5>
                        Section {index0 + 1}: {subtitle.subtitle}
                      </h5>
                    </Accordion.Header>
                    <Accordion.Body>
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
                        <ListGroup.Item key={"exam"}>
                          <button
                            id={subtitle._id}
                            name={"exam"}
                            onClick={handleExamClick}
                            className={style["subtitleView"]}
                          >
                            Exam
                          </button>
                          <Modal
                            backdrop={false}
                            show={show}
                            onHide={handleClose}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Grade</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className={style["rating-box"]}>
                                {grade == null ? (
                                  <h3>Not Graded Yet</h3>
                                ) : (
                                  <h3>Grade: {grade}</h3>
                                )}
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              <div>
                <Accordion.Item key={"finalExam"} className="d-grid gap-2">
                  <Button
                    id={location.state.courseId}
                    name={"finalexam"}
                    onClick={handleFinalExamClick}
                    size="lg"
                    variant="light"
                  >
                    Final Exam
                  </Button>
                  <Modal backdrop={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Grade</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className={style["rating-box"]}>
                        {grade == null ? (
                          <h3>Not Graded Yet</h3>
                        ) : (
                          <h3>
                            Grade: {grade} / {questions}
                          </h3>
                        )}
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Accordion.Item>
              </div>
            </Accordion>
          </section>
        </section>
      )}
    </>
  );
};

export default Subtitle;
