import React from "react";
import "./CourseCard.css"
import { useNavigate } from "react-router-dom";
export const CourseCard = (props) => {
  const navigate = useNavigate();
  const courseId = props.data._id;
  const handleClick=()=>{
    navigate('/course',{state :{id:courseId}}); 
  }
  
  return (
    <div className="card">
      <h4>Title: {props.data.title}</h4>
      <div>Total hours of Course: {props.data.totalHourseOfCourse}</div>
      <div>Rating: {props.data.rating}</div>
      <div>Price: {props.data.price}</div>
      <button onClick={handleClick}>View Course</button>
    </div>
  );
};
