import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
import Box from "@mui/material/Box";
import { Content, ContextualHelp, Heading } from "@adobe/react-spectrum";
import { AiOutlineCheck } from "react-icons/ai";
import Badge from "react-bootstrap/Badge";

const LINK_URL = "/course/link/view";
const cookies = new Cookies();
const Subtitle = () => {
  const progress = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  //const history = useHistory();
  const query = location.search;
  const subtitleId = new URLSearchParams(location.search).get("subtitleId");
  const [link, setLink] = useState({ linkUrl: "", linkDesc: "" });
  const [subtitles, setSubtitles] = useState([]);
  //const subtitles2 = location.state.data;
  const [isloading, setIsLoading] = useState(false);
  const [grade, setGrade] = useState([]);
  const [finalgrade, setFinalGrade] = useState(-1);
  const [finalquestions, setFinalQuestions] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState([]);
  // const [show, setShow] = useState(false);

  const [notes, setNotes] = useState("Blank");
  const downloadPDFFile = () => {
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text(20, 20, notes);
    doc.save("myNotes.pdf");
  };

  const saveNotes = async (e) => {
    let res = await axios.patch("/individualtrainee/addNotes", {
      notes: notes,
      linkId: link._id,
      courseId: location.state.courseId,
      subtitleId: subtitleId,
    });
    console.log(res.status);
  };

  const getFinishedExams = async (e) => {
    if (cookies.get("status") !== 1) {
      try {
        let res = await axios.post("/individualtrainee/getTraineeExams", {
          courseId: location.state.courseId,
        });
        let finalexam = await axios.get(
          `/individualtrainee/getFinalExamGrade?studentId=${cookies.get(
            "currentUser"
          )}&courseId=${location.state.courseId}`
        );

        setGrade(res.data);
        setFinalGrade(finalexam.data.result);
        setFinalQuestions(finalexam.data.studentChoices.length);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getFinishedItems = async (e) => {
    console.log("yes");
    if (cookies.get("status") !== 1) {
      try {
        let res = await axios.get("/individualtrainee/getTraineeProgress", {
          courseId: location.state.courseId,
        });
        setDone(res.data.progress);
        setNotes(res.data.notes);
        console.log(res.data.progress);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getOldNotes = async (e) => {
    let id = new URLSearchParams(location.search).get("linkId");
    try {
      let res = await axios.get("/individualtrainee/getNote", {
        params: {
          subtitleId: subtitleId,
          linkId: id,
          courseId: location.state.courseId,
        },
      });
      setNotes(res.data.notes);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNotesChange = (event) => {
    // 👇️ access textarea value
    setNotes(event.target.value);
  };
  const handleClick = async (e, url, linkId, subtitleId) => {
    e.preventDefault();
    console.log(url);
    console.log(linkId);
    console.log(subtitleId);
    if (cookies.get("status") !== 1) {
      try {
        const res = await axios.post("/individualtrainee/updateLinkProgress", {
          linkId: linkId,
          courseId: location.state.courseId,
          completedItems: 1,
          subtitleId: subtitleId,
        }); //status 1 means instructor 2c,0 means trainee 3 means admin
        console.log(res);
        if (res) {
          navigate(
            {
              pathname: "/subtitleView",
              search: url,
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
        }
      } catch (e) {
        console.log(e);
      }
    } else {
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
    }
  };

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

  // const handleProgress = async (event) => {
  //   let progresser = 0;
  //   if (event.data == 1) {
  //     progress.current = setInterval(async () => {
  //       const player = event.target;
  //       const currentTime = player.getCurrentTime();
  //       const duration = player.getDuration();
  //       progresser = Math.floor((currentTime / duration) * 100);
  //       if (progresser >= 80) {
  //         progresser = 100;
  //       }
  //       let res = await axios.post("/individualtrainee/updateLinkProgress", {
  //         linkId: link._id,
  //         courseId: location.state.courseId,
  //         completedItems: progresser,
  //       });
  //     }, 5000);
  //   } else if (event.data == 2 || event.data == 0) {
  //     const player = event.target;
  //     const currentTime = player.getCurrentTime();
  //     const duration = player.getDuration();
  //     progresser = Math.floor((currentTime / duration) * 100);
  //     if (progresser >= 80) {
  //       progresser = 100;
  //     }
  //     let res = await axios.post("/individualtrainee/updateLinkProgress", {
  //       id: cookies.get("currentUser"),
  //       courseId: location.state.courseId,
  //       completedItems: progresser,
  //     });
  //   }
  //   return () => {
  //     clearInterval(progress.current);
  //   };
  // };

  const FetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(LINK_URL + query);
      setLink(res.data);
      setSubtitles(location.state.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    FetchData();
    getOldNotes();
    getFinishedItems();
    getFinishedExams();
    // return () => {
    //   clearInterval(progress.current);
    // };
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
                    autoplay: 0,
                  },
                }}
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
                <div className="d-grid gap-2 mt-2">
                  <button
                    onClick={saveNotes}
                    className="btn btn-primary"
                    style={{ backgroundColor: "#a00407", border: "none" }}
                  >
                    Save Notes
                  </button>
                  <button
                    onClick={downloadPDFFile}
                    className="btn btn-primary"
                    style={{ backgroundColor: "#a00407", border: "none" }}
                  >
                    Download Notes
                  </button>
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
                          <ListGroup.Item
                            key={index1}
                            className="d-flex justify-content-between align-items-start"
                          >
                            <button
                              name={index0 + " " + index1}
                              onClick={(e) =>
                                handleClick(
                                  e,
                                  "linkId=" +
                                    link._id +
                                    "&subtitleId=" +
                                    subtitleId,
                                  link._id,
                                  subtitleId
                                )
                              }
                              value={subtitle._id}
                              className={style["subtitleView"]}
                            >
                              {link.linkDesc}
                            </button>
                            {done.find((item) => item.linkId === link._id) ? (
                              <AiOutlineCheck className={style["check"]} />
                            ) : null}
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item
                          key={"exam"}
                          className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                        >
                          {grade.find(
                            (item) => item.subtitleId === subtitle._id
                          ) ? (
                            <>
                              <button
                                id={subtitle._id}
                                name={"exam"}
                                onClick={handleExamClick}
                                className={style["subtitleView"]}
                                disabled
                              >
                                Quiz
                              </button>
                              <h5>
                                <Badge
                                  bg="primary"
                                  className={style["gradeBadge"]}
                                  pill
                                >
                                  {grade.find(
                                    (item) => item.subtitleId === subtitle._id
                                  ).result +
                                    "/" +
                                    grade.find(
                                      (item) => item.subtitleId === subtitle._id
                                    ).studentChoices.length}
                                </Badge>
                              </h5>
                            </>
                          ) : (
                            <button
                              id={subtitle._id}
                              name={"exam"}
                              onClick={handleExamClick}
                              className={style["subtitleView"]}
                            >
                              Quiz
                            </button>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              <div>
                <Accordion.Item key={"finalExam"} className="d-grid gap-2">
                  {finalgrade !== -1 ? (
                    <>
                      <h5 className="d-flex justify-content-center mt-2 ">
                        Final Exam Grade
                      </h5>
                      <h3 className="d-flex justify-content-center">
                        {finalgrade + "/" + finalquestions}
                      </h3>
                    </>
                  ) : (
                    <Button
                      id={location.state.courseId}
                      name={"finalexam"}
                      onClick={handleFinalExamClick}
                      size="lg"
                      style={{
                        backgroundColor: "#a00407",
                        borderRadius: 0,
                        border: "none",
                      }}
                    >
                      Final Exam
                    </Button>
                  )}
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
