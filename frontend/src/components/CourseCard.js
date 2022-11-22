import React from "react";
import "./CourseCard.css";
import { useNavigate } from "react-router-dom";
import a from "../static/logo.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export const CourseCard = (props) => {
  const navigate = useNavigate();
  const status = cookies.get('status');
  const courseId = props.data._id;
  const handleClick = () => {
    navigate("/course", { state: { id: courseId } });
  };
  if (status ==2) {
    return (
      <div className="card">
        <h4>Title: {props.data.title}</h4>
        <div>Total hours of Course: {props.data.totalHoursOfCourse}</div>
        <div>
          {props.data.rating === 0 ? "unrated" : `rating: ${props.data.rating}`}
        </div>
      </div>
    );
  }
  if (props.titleOnly) {
    return (
      <div className="card">
        <h4>Title: {props.data.title}</h4>
        <button onClick={handleClick}>View Course</button>
      </div>
    );
  }
  return (
    <div className="card">
      <img src={a} alt="courseImage"></img>
      <h4>{props.data.title}</h4>
      <div>Total hours of Course: {props.data.totalHoursOfCourse}</div>
      <div>rating: {props.data.rating === 0 ? "unrated" : props.data.rating}</div>
      {props.data.price === 0 ? (
        <div>Price : Free</div>
      ) : (
        <>
          {!window.sessionStorage.getItem("factor") ? (
            <div>Price: {props.data.price} USD</div>
          ) : (
            <div>
              Price:{" "}
              {props.data.price * window.sessionStorage.getItem("factor")}{" "}
              {window.sessionStorage.getItem("currency").toUpperCase()}
            </div>
          )}
        </>
      )}
      <button onClick={handleClick}>View Course</button>
    </div>
  );
};
