import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "./RegCourse";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "./RegCourse.module.css";
import style from "./AskInstructor.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function AskInstructor() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [traineeId, setTraineeId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [questionId, setQuestionId] = useState("");
  const location = useLocation();
  const index = new URLSearchParams(location.search).get("idx");
  const userId = cookies.get("currentUser");
  //console.log(location.state);

  const handleSubmitNewQuestion = async (qID) => {
    let res = await axios.post("/individualtrainee/askInstructor", {
      traineeId: traineeId,
      courseId: courseId,
      instructorId: instructorId,
      question: question,
    });
  };
  const handleSubmitReply = async (qID) => {
    let res = await axios.patch("/individualtrainee/addReply", {
      questionId: qID,
      reply: newReply,
    });
  };
  const fetchdata = async () => {
    console.log(location.state.course_id);
    console.log(userId);
    setIsLoading(true);
    try {
      if (cookies.get("status") === 1) {
        const url = "instructor/getQuestions";
        const res = await axios.get(url, {
          params: {
            courseId: location.state.course_id,
            instructorId: userId,
          },
        });
        setQuestions(res.data);
        console.log(res.data);
      } else {
        const url = "individualtrainee/getQuestions";
        const res = await axios.get(url, {
          params: {
            courseId: location.state.course_id,
            traineeId: userId,
          },
        });
        setQuestions(res.data);
        console.log(res.data);
        setInstructorId(res.data[0].instructorId._id);
        setTraineeId(res.data[0].traineeId._id);
        setCourseId(res.data[0].courseId._id);
        console.log(res.data);
        setInstructorName("Prof " + location.state.course_inst + " ");
        setStudentName(
          res.data[0].traineeId.firstname + " " + res.data[0].traineeId.lastname
        );
      }

      setInstructorId(questions[0].instructorId._id);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className={style["container"]}>
      <div className={regStyles["mainreg"]}>
        <RegCourse
          course_id={location.state.course_id}
          course_img={location.state.course_img}
          course_title={location.state.course_title}
          course_inst={location.state.course_inst}
          progress={location.state.progress}
          name={"AskInstructor"}
          idx={index}
        />
      </div>
      <div className={style["mainRight"]}>
        {questions.map((el, index) => {
          // setQuestionId(el._id);
          console.log(el._id);
          return (
            <div>
              <div>
                {" "}
                <h1>
                  Q{index + 1}: {el.question}
                </h1>
              </div>
              <div>
                {el.replies.map((replies) => {
                  if (replies.isInstructor == false) {
                    return (
                      <div>
                        <div>
                          <h5>
                            {studentName} {": "}
                          </h5>
                          <h5>
                            {"-"}
                            {replies.reply}
                          </h5>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <div>
                          <h5>
                            <h5>
                              {instructorName}
                              {":  "}
                            </h5>
                            {"-"}
                            {replies.reply}
                          </h5>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div>
                <form>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    type="txt"
                    placeholder="Reply"
                    //style={styles.input}
                    onChange={(e) => setNewReply(e.target.value)}
                    required
                  ></textarea>
                  <div>
                    <Button
                      className={style["button"]}
                      type="reply"
                      onClick={() => handleSubmitReply(el._id)}
                      // onClick={handleSubmitReply}
                    >
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
        <div>
          <h2>Ask new question</h2>
          <div>
            <form>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                type="txt"
                placeholder="Reply"
                //style={styles.input}
                onChange={(e) => setQuestion(e.target.value)}
                required
              ></textarea>
              <div>
                <Button
                  className={style["button"]}
                  type="send"
                  onClick={() => handleSubmitNewQuestion()}
                  // onClick={handleSubmitReply}
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AskInstructor;
