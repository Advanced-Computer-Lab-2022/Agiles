import style from "./CoursePreview.module.css";
import Rating from "@mui/material/Rating";
import ProgressBar from "react-bootstrap/ProgressBar";

const CoursePreview = (props) => {
  const course = props.course;
  return (
    <div className={style["mainRight"]}>
    <label className={style["mainlabel"]}>Course Preview</label>
    <ProgressBar
        now={props.progress}
        className ={style["progressbar"]}
        label={`${props.progress}% completed` }
      ></ProgressBar>
    <h1>Welcome to the {course.title} Course</h1>
    <div className={style['video']}>
    <iframe
      width="1000"
      height="500"
      src={course.coursePreviewUrl}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe></div>
    <hr className={style["mainRight-hr"]}></hr>
    <h3>About this course</h3>
    <p>{course.description}</p>
    <hr className={style["mainRight-hr"]}></hr>
    <h3>Subject</h3>
    <p>{course.subject}</p>
    <hr className={style["mainRight-hr"]}></hr>
    <h3>Rating</h3>
    <Rating name="rating" readOnly value={course.rating} className={style['rating']} />

  </div>
  );
};

export default CoursePreview;