import React from "react";
import style from "./CourseCard.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import YouTubeIcon from "@mui/icons-material/YouTube";
const cookies = new Cookies();
export const CourseCard = (props) => {
  const navigate = useNavigate();
  const status = cookies.get("status");
  const courseId = props.data._id;
  const handleClick = () => {
    navigate("/course", { state: { id: courseId } });
  };
  if (status == 2) {
    return (
      <div className={style["card"]}>
        <img
          src={props.data.imgUrl}
          onClick={handleClick}
          alt="courseImage"
        ></img>
        <div className={style["cardheader"]}>{props.data.title}</div>
        <div className={style["cardfooter"]}>{props.data.instructorname}</div>
        <div>
          <YouTubeIcon className={style["icon"]} />{" "}
          <label className={style["time"]}>
            {props.data.totalHoursOfCourse}h 30m
          </label>
        </div>
        <div>
        <label className={style["time"]}>
          rating: {props.data.rating === 0 ? "unrated" : props.data.rating}
        </label>
      </div>
      </div>
    );
  }
  return (
    <div className={style["card"]}>
      <img
        src={props.data.imgUrl}
        onClick={handleClick}
        alt="courseImage"
      ></img>
      <div className={style["cardheader"]}>{props.data.title}</div>
      <div className={style["cardfooter"]}>{props.data.instructorname}</div>
      <div>
        <YouTubeIcon className={style["icon"]} />
        <label className={style["time"]}>
          {props.data.totalHoursOfCourse}h 30m
        </label>
      </div>
      <div>
        <label className={style["time"]}>
          rating: {props.data.rating === 0 ? "unrated" : props.data.rating}
        </label>
      </div>
      {props.data.price === 0 ? (
        <div>
          <label className={style["time"]}>Free</label>
        </div>
      ) : (
        <>
          {!window.sessionStorage.getItem("factor") ? (
            <div>
              <label className={style["time"]}> {props.data.price} USD </label>
            </div>
          ) : (
            <div>
              <label className={style["time"]}>
                {Math.floor(props.data.price * window.sessionStorage.getItem("factor"))}
                {" "}
                {window.sessionStorage.getItem("currency").toUpperCase()}
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};
