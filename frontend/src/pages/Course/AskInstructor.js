import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "./RegCourse";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "./RegCourse.module.css";
import style from "./AskInstructor.module.css";
import Question from "./Question";
import Cookies from "universal-cookie";
import spinner from "../../static/download.gif";
import LoadingScreen from "react-loading-screen";

const cookies = new Cookies();

function AskInstructor() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [update, setUpdate] = useState(false);
  const location = useLocation();
  const index = new URLSearchParams(location.search).get("idx");
  const userId = cookies.get("currentUser");

  const handleSubmitNewQuestion = async (e) => {
    e.preventDefault();
    setUpdate(true);
    try {
      let res = await axios.post("/individualtrainee/askInstructor", {
        traineeId: userId,
        courseId: location.state.course_id,
        question: question,
      });

      setChange(!change);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchdata = async () => {
    if (!update) {
      setIsLoading(true);
    }

    try {
      const url = "individualtrainee/getQuestions";
      const res = await axios.get(url, {
        params: {
          courseId: location.state.course_id,
          traineeId: userId,
        },
      });
      setQuestions([]);
      setQuestions(res.data);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [change]);
  console.log(questions);
  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;
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
        <div style={{ marginBottom: "25px", maxWidth: "1200px", width: "75%" }}>
          <form>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              type="txt"
              placeholder="ask a new question"
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              required
            ></textarea>
            <div>
              <Button
                style={{ marginTop: "10px" }}
                className={style["button"]}
                type="send"
                onClick={(e) => handleSubmitNewQuestion(e)}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
        <div className={style["mainRight"]}>
          {questions.map((el, index) => {
            // console.log(el);
            console.log(el.question);
            console.log(el.replies);
            return (
              <Question
                el={el}
                index={index}
                length={questions.length}
                isInstructor={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AskInstructor;
