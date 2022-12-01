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
    navigate({
      pathname: e.target.id,
      search: `?courseId=${course_id}`,
    });
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
            id="/preInst"
            className={
              name == "preview" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "preview" ? () => {} : handleClick}
          >
            Course Preview
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
        </ul>
      </div>
    </section>
  );
};

export default MyCourseInst;
