import Rating from "@mui/material/Rating";
import RegCourseCardStyles from "./RegCourseCard.module.css";
import { useNavigate } from "react-router-dom";
const RegCourseInst = (props) => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate(
      {
        pathname: "/preInst",
        search: `courseId=${props.data._id}`,
      }
    );
  };

  return (
    <div className={RegCourseCardStyles["regcard"]}>
      <button>
        <div className={RegCourseCardStyles["regcard__image"]}>
          <img src={props.data.imgUrl} alt="course" onClick={handelClick} />
        </div>
        <div className={RegCourseCardStyles["cardheader"]}>
          {props.data.title}
        </div>
        <div>
          <Rating
            name="rating"
            readOnly
            value={props.data.rating}
            className={RegCourseCardStyles["rating"]}
          />
        </div>
      </button>
    </div>
  );
};

export default RegCourseInst;
