import regStyles from "./RegCourse.module.css";
import { useNavigate } from "react-router-dom";
const RegCourse = ({
  course_id,
  course_img,
  course_title,
  course_inst,
  name,
  progress,
}) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate(
      {
        pathname: e.target.id,
        search: `?courseId=${course_id}`,
      },
      {
        state: {
          progress: progress,
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
        <ul>
          <li
            id="/preReg"
            className={
              name == "preview" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "preview" ? () => {} : handleClick}
          >
            {" "}
            Course Preview
          </li>
          <li
            id="/conReg"
            className={
              name == "content" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "content" ? () => {} : handleClick}
          >
            {" "}
            Course Content{" "}
          </li>
          <li
            id="/grades"
            className={
              name == "grades" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "grade" ? () => {} : handleClick}
          >
            Grades
          </li>
          <li
            id="/finalexam"
            className={
              name == "exams" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "exam" ? () => {} : handleClick}
          >
            Course Final Exam
          </li>
        </ul>
      </div>
    </section>
  );
};

export default RegCourse;
