import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "../Course/RegCourse";
import MyCourseInst from "./MyCourseInst";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "../Course/RegCourse.module.css";
import style from "./AnswerTrainee.module.css";
import Question from "./InstructorQuestions";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function AnswerTrainee() {
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
  console.log(location.state);

  const handleSubmitNewQuestion = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("/individualtrainee/askInstructor", {
        traineeId: userId,
        courseId: location.state.course_id,
        question: question,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchdata = async () => {
    // console.log(location.state.course_id);

    setIsLoading(true);
    try {
      //   console.log(location.state.course_id);
      const url = "instructor/getQuestions";
      const res = await axios.get(url, {
        params: {
          courseId: location.state.course_id,
        },
      });
      console.log(res.data);
      setQuestions(res.data);
      // setInstructorId(res.data[0].instructorId._id);
      // setTraineeId(res.data[0].traineeId._id);
      // setCourseId(res.data[0].courseId._id);
      // console.log(res.data[0].traineeId.firstname);
      //   setInstructorName(
      //     "Prof " +
      //       res.data[0].instructorId.firstname +
      //       res.data[0].instructorId.lastname +
      //       " "
      //   );
      //   setStudentName(
      //     res.data[0].traineeId.firstname + " " + res.data[0].traineeId.lastname
      //   );

      //   setInstructorId(questions[0].instructorId._id);

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
        <MyCourseInst
          course_id={location.state.course_id}
          course_img={location.state.course_img}
          course_title={location.state.course_title}
          course_inst={location.state.course_inst}
          progress={location.state.progress}
          name={"AnswerQuestions"}
          idx={index}
        />
      </div>
      <div className={style["right"]}>
        <div className={style["mainRight"]}>
          {questions.map((el, index) => {
            return <Question el={el} index={index} length={questions.length} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AnswerTrainee;
