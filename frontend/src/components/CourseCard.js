import React from "react";
import CourseCardStyles from "./CourseCard.module.css";
export const CourseCard = () => {
  return (
    <div className={CourseCardStyles["card"]}>
      <h4>title</h4>
      <div> img</div>
      <div>number of hours</div>
      <div>rating</div>
    </div>
  );
};
