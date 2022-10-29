import React from "react";
import "./CourseCard.css";
import { useNavigate } from "react-router-dom";
export const CourseCard = (props) => {
  const navigate = useNavigate();
  const courseId = props.data._id;
  const handleClick = () => {
    navigate("/course", { state: { id: courseId } });
  };
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
      <h4>Title: {props.data.title}</h4>
      <div>Total hours of Course: {props.data.totalHourseOfCourse}</div>
      <div>Rating: {props.data.rating}</div>
      <div>Price: {props.data.price*(window.sessionStorage.getItem("factor"))} {window.sessionStorage.getItem("currency")}</div>
      <button onClick={handleClick}>View Course</button>
    </div>
  );
};
