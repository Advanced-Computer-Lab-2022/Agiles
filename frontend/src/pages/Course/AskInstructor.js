import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "./RegCourse";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "./RegCourse.module.css";
import style from "./AskInstructor.module.css";
import Question from "./Question";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function AskInstructor() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [traineeId, setTraineeId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [questionId, setQuestionId] = useState("");
  const location = useLocation();
  const index = new URLSearchParams(location.search).get("idx");
  const userId = cookies.get("currentUser");
  // console.log(location.state);

  const handleSubmitNewQuestion = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/individualtrainee/askInstructor", {
        traineeId: userId,
        courseId: location.state.course_id,
        question: question,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchdata = async () => {
    // console.log(location.state.course_id);
    // console.log(userId);
    setIsLoading(true);
    try {
      const url = "individualtrainee/getQuestions";
      const res = await axios.get(url, {
        params: {
          courseId: location.state.course_id,
          traineeId: userId,
        },
      });
      setQuestions(res.data);
      // setInstructorId(res.data[0].instructorId._id);
      // setTraineeId(res.data[0].traineeId._id);
      // setCourseId(res.data[0].courseId._id);
      // console.log(res.data[0].traineeId.firstname);
      setInstructorName(
        "Prof " +
          res.data[0].instructorId.firstname +
          res.data[0].instructorId.lastname +
          " "
      );
      setStudentName(
        res.data[0].traineeId.firstname + " " + res.data[0].traineeId.lastname
      );

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
      <div className={style["right"]}>
        <h2> New Question</h2>
        <div style={{ marginBottom: "25px" }}>
          <form>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              type="txt"
              placeholder="ask a question"
              //style={styles.input}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></textarea>
            <div>
              <Button
                style={{ marginTop: "10px" }}
                className={style["button"]}
                type="send"
                onClick={(e) => handleSubmitNewQuestion(e)}
                // onClick={handleSubmitReply}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className={style["mainRight"]}>
          {questions.map((el, index) => {
            return <Question el={el} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AskInstructor;
