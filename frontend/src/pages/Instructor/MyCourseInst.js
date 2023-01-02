import regStyles from "../Course/RegCourse.module.css";
import { useNavigate } from "react-router-dom";
const MyCourseInst = ({
  course_id,
  course_img,
  course_title,
  course_inst,
  name,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    console.log(course_id);
    console.log(course_img);
    console.log(course_title);
    console.log(course_inst);
    console.log(name);
    navigate(
      {
        pathname: e.target.id,
        search: `?courseId=${course_id}`,
      },
      {
        state: {
          course_id: course_id,
          course_img: course_img,
          course_title: course_title,
          course_inst: course_inst,
          name: name,
        },
      }
    );
  };
  return (
    <section className={regStyles["leftsection"]}>
      <div className={regStyles["leftsection-top"]}>
        <img
          src={course_img}
          alt="courseimage"
          className={regStyles["leftsection-img"]}
        />
        <label className={regStyles["leftsection-title"]}>{course_title}</label>
        <label className={regStyles["leftsection-subtitle"]}>
          {course_inst}
        </label>
      </div>
      <div className={regStyles["leftsection-bottom"]}>
        <ul style={{ padding: "0",listStyle:'none' }}>
          <li
            id="/preInst"
            className={
              name == "preview" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "preview" ? () => {} : handleClick}
          >
            Overview
          </li>
          <li
            id="/conInst"
            className={
              name == "content" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "content" ? () => {} : handleClick}
          >
            Course Content
          </li>
          <li
            id="/setFinalExam"
            className={
              name == "setexam" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "setexam" ? () => {} : handleClick}
          >
            Set Final Exam
          </li>
          <li
            id="/AnswerQuestions"
            className={
              name == "answerquestions" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "answerquestions" ? () => {} : handleClick}
          >
            {" "}
            Questions{" "}
          </li>
          <li
            id="/reportProblem"
            className={
              name == "supportCenter" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "reportproblem" ? () => {} : handleClick}
          >
            Support Center
          </li>
          
        </ul>
      </div>
    </section>
  );
};

export default MyCourseInst;
