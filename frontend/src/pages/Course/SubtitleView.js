import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./SubtitleView.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Cookies from "universal-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import { Content, ContextualHelp, Heading } from "@adobe/react-spectrum";

// import Textarea from "@mui/joy/Textarea";
// import FormControl from "@mui/material/FormControl";

// import FormLabel from "@mui/joy/FormLabel";
// import IconButton from "@mui/joy/IconButton";
// import Menu from "@mui/joy/Menu";
// import MenuItem from "@mui/joy/MenuItem";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
// import FormatBold from "@mui/icons-material/FormatBold";
// import FormatItalic from "@mui/icons-material/FormatItalic";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
// import Check from "@mui/icons-material/Check";

import TextField from "@mui/material/TextField";

const LINK_URL = "/course/link/view";
const cookies = new Cookies();
const Subtitle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.search;
  const [link, setLink] = useState({ linkUrl: "", linkDesc: "" });
  const [subtitles, setSubtitles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState([]);
  const [questions, setQuestions] = useState(0);
  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState("Blank");
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleNotesChange = (event) => {
    // 👇️ access textarea value
    setNotes(event.target.value);
    console.log(event.target.value);
  };
  const handleClick = (e) => {
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

  const FetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(LINK_URL + query);
      setLink(res.data);
      setSubtitles(location.state.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    console.log(notes);
    FetchData();
  }, []);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main-section"]}>
          <section className={style["main-section-left"]}>
            <section className={style["main-section-left-top"]}>
              <iframe
                width="800"
                height="450"
                src={link.linkUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
