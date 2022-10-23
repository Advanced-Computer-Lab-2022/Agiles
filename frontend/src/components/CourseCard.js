import React from "react";
import CourseCardStyles from "./CourseCard.module.css";
export const CourseCard = (props) => {
  return (
    <div className={CourseCardStyles["card"]}>
      <h4>title: {props.data.title}</h4>
      <div> img </div>
      <div>number of hours: {props.data.totalHourseOfCourse}</div>
      <div>rating: {props.data.rating}</div>
    </div>
  );
};
