import React, { useState } from "react";
import style from "./CourseCard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Rating from "@mui/material/Rating";
import YouTubeIcon from "@mui/icons-material/YouTube";
const cookies = new Cookies();
export const CourseCard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const status = cookies.get("status");
  const hours = Math.floor(props.data.totalHoursOfCourse/60);
  const min = props.data.totalHoursOfCourse%60;
  const courseId = props.data._id;
  const onCourses =
    location.pathname == "/courses" ||
    location.pathname == "/";
  const handleClick = () => {
    if (props.admin) {
      return;
    }
    if (onCourses) {
      navigate({ pathname: "/course", search: `cid=${courseId}` });
    } else {
      navigate({ pathname: "/preInst", search: `courseId=${courseId}` });
    }
  };
  return (
    <div className={style["card"]}>
      <button onClick={handleClick}>
        <div style={{ display: "none" }} id={courseId}>
          {courseId}
        </div>
        <img
          src={props.data.imgUrl}
          onClick={handleClick}
          alt={props.data.title}
        ></img>
        <div className={style["cardheader"]}>{props.data.title}</div>
        <div className={style["cardfooter"]}>{props.data.instructorname}</div>
        <div>
          <label className={style["time"]}>
            <span style={{ color: "#a00407", marginRight: "0.5rem" }}>
              {props.data.studentCount} (students)
            </span>{" "}
            <YouTubeIcon className={style["icon"]} />
            {hours}h {min}m
          </label>
        </div>
        <div className={style["rating"]}>
          <Rating
            name="rating"
            readOnly
            value={Math.round(props.data.rating / props.data.ratingCount)}
          />
          <label>({props.data.ratingCount - 1} ratings)</label>
        </div>
        {status != 2 && (
          <div className={style["price"]}>
            {props.data.price === 0 ? (
              <div>
                <label className={style["time"]}>Free</label>
              </div>
            ) : (
              <>
                {!window.sessionStorage.getItem("factor") ? (
                  <div>
                    <label className={style["time"]}>
                      {" "}
                      {props.data.price -
                        (props.data.price * props.data.discount) / 100}{" "}
                      USD{" "}
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className={style["time"]}>
                      {Math.floor(
                        props.data.price *
                          window.sessionStorage.getItem("factor")
                      )}{" "}
                      {window.sessionStorage.getItem("currency").toUpperCase()}
                    </label>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </button>
    </div>
  );
};
