import regStyles from "./RegCourse.module.css";
import { useNavigate } from "react-router-dom";
const RegCourse = ({
  course_id,
  course_img,
  course_title,
  course_inst,
  name,
  progress,
  idx,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(
      {
        pathname: e.target.id,
        search: `?courseId=${course_id}&idx=${idx}`,
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
        <ul style={{ padding: "0" }}>
          <li
            id="/preReg"
            className={
              name == "preview" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "preview" ? () => {} : handleClick}
          >
            {" "}
            Overview
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
            id="/reportproblem"
            className={
              name == "supportCenter" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "reportproblemtrainee" ? () => {} : handleClick}
          >
            Support Center
          </li>
          <li
            id="/AskInstructor"
            className={
              name == "AskInstructor" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "AskInstructor" ? () => {} : handleClick}
          >
            {" "}
            Ask Instructor{" "}
          </li>
          <li
            id="/requestrefund"
            className={
              name == "requestRefund" ? regStyles["leftsection-liclicked"] : ""
            }
            onClick={name === "requestRefund" ? () => {} : handleClick}
          >
            Request Refund
          </li>
        
        </ul>
      </div>
    </section>
  );
};

export default RegCourse;
