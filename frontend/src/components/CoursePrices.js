import React from "react";
import "./CourseCard.css"
export const CoursePrices = (props) => {
  return (
    <div className="card">
      <h4>Title: {props.data.title}</h4>
      <div>Price: {props.data.price}</div>
    </div>
  );
};
