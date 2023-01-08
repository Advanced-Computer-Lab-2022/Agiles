import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "../Course/RegCourse";
import MyCourseInst from "./MyCourseInst";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "../Course/RegCourse.module.css";
import style from "./AnswerTrainee.module.css";
import Question from "../Course/Question";
import Cookies from "universal-cookie";

import spinner from "../../static/download.gif";
import LoadingScreen from "react-loading-screen";
const cookies = new Cookies();

function AnswerTrainee() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const index = new URLSearchParams(location.search).get("idx");
  const userId = cookies.get("currentUser");

  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const url = "instructor/getQuestions";
      const res = await axios.get(url, {
        params: {
          courseId: location.state.course_id,
        },
      });
      setQuestions(res.data);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;

  return (
    <div className={style["container"]}>
      <div className={regStyles["mainreg"]}>
        <MyCourseInst
          course_id={location.state.course_id}
          course_img={location.state.course_img}
          course_title={location.state.course_title}
          course_inst={location.state.course_inst}
          progress={location.state.progress}
          name="answerquestions"
          idx={index}
        />
      </div>
      <div className={style["right"]}>
        <label className={style["mainlabel"]}>Students' Questions</label>
        <div className={style["mainRight"]}>
          {questions.map((el, index) => {
            return (
              <Question
                studentName={
                  el.traineeId.firstname + " " + el.traineeId.lastname
                }
                key={el._id}
                el={el}
                index={index}
                length={questions.length}
                isInstructor={true}
                instructor={true}
              />
            );
          })}
          {questions.length===0 && <div style={{fontWeight :'bold' }}>No questions to answer</div> }
        </div>
      </div>
    </div>
  );
}

export default AnswerTrainee;
