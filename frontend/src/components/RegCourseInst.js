import Rating from "@mui/material/Rating";
import RegCourseCardStyles from "./RegCourseCard.module.css";

const RegCourseInst = (props) => {
    const handelClick = ()=>{

    }
    return (  <div className={RegCourseCardStyles["regcard"]}>
    <div className={RegCourseCardStyles["regcard__image"]}>
      <img
        src={props.data.imgUrl}
        alt="course"
        onClick={handelClick}
      />
    </div>
    <div className={RegCourseCardStyles["cardheader"]}>{props.data.title}</div>
    <div>
    <Rating name="rating" readOnly value={props.data.rating} className={RegCourseCardStyles["rating"]} />
    </div>
  </div> );
}
 
export default RegCourseInst;