import React from "react";
import "./CourseCard.css"
export const CoursePrices = (props) => {
  return (
    <div className="card">
      <h4>Title: {props.data.title}</h4>
      {!window.sessionStorage.getItem("factor")?( <div>Price: {(props.data.price)} USD</div>):( <div>Price: {(props.data.price)*(window.sessionStorage.getItem("factor"))} {window.sessionStorage.getItem("currency").toUpperCase()}</div>)}  
    </div>
  );
};
