import RegCourseCardStyles from "./RegCourseCard.module.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";


const RegCourseCard = (props) => {
  const navigate = useNavigate();
  const handelClick = ()=>{
    navigate({
      pathname: "/regcourse",
      search: `?course=${props.data.title}`,
      
    },{state: { course: props.data , progress: props.progress }});
  }
  return (
    <div className={RegCourseCardStyles["regcard"]}>
      <div className={RegCourseCardStyles["regcard__image"]}>
        <img
          src={props.data.imgUrl}
          alt="course"
          onClick={handelClick}
        />
      </div>
      <div className={RegCourseCardStyles["cardheader"]}>{props.data.title}</div>
      <div className={RegCourseCardStyles["cardfooter"]}>{props.data.instructorname}</div>
      <ProgressBar
        now={props.progress}
        className={RegCourseCardStyles["progressbar"]}
      ></ProgressBar>
      <div>
      <label className={RegCourseCardStyles["progresslabel"]}>
        {props.progress} % complete
      </label>
      <Rating name="rating" readOnly value={props.data.rating} className={RegCourseCardStyles["rating"]} />
      <button className={RegCourseCardStyles["edit"]}>
        Edit rating
      </button>
     
      </div>
    </div>
  );
};

export default RegCourseCard;
