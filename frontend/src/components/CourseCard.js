import React from "react";
import "./CourseCard.css"
export const CourseCard = (props) => {
  return (
    <div className="card">
      <h4>Title: {props.data.title}</h4>
      <div>Total hours of Course: {props.data.totalHourseOfCourse}</div>
      <div>Rating: {props.data.rating}</div>
      <div>Price: {props.data.price}</div>
    </div>
  );
};
