import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import InstructorRatingStyles from "./InstructorRating.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function InstructorRating(props) {
  const userId = cookies.get("currentUser");
  const instId = props.instId;
  const [instRating,setInstRating]=useState(props.instRating); 
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get("courseId");
  const [value, setValue] = useState(instRating===-1?0:instRating);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState(" ");

  const setRating = async (event) => {
    event.preventDefault();
    event.target.reset();
    console.log(value);
    if (instRating != -1) {
      const bodyUpdate = {
        instId: instId,
        courseId : course_id,
        userId: userId,
        userRating: value,
        userReview: review,
        currentRating: instRating,
      };
      //check if he already done it before
      try {
        const res = axios.patch("/instructor/updateRating", bodyUpdate);
        setInstRating(value);
      } catch (err) {
        console.log(err);
      }
    } else {
      const body = {
        instId: instId,
        courseId :course_id,
        userId: userId,
        userRating: value,
        userReview: review,
      };
      try {
        const res = axios.post("/instructor/setRating", body);
        setInstRating(value);
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(()=>{
  },[instRating]);
  return (
    <div className={InstructorRatingStyles["ratingStars"]}>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={1}
          getLabelText={getLabelText}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <br></br>
      <form onSubmit={setRating}>
        <input
          type="text"
          value={review}
          onChange={(event) => {
            setReview(event.target.value);
          }}
        />
        <button type="submit">submit Review</button>
      </form>
    </div>
  );
}

export default InstructorRating;
