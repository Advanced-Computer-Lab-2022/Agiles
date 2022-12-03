import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import InstructorRatingStyles from "./InstructorRating.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

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

function InstructorRating({id,instRating,instReview}) {
  const userId = cookies.get("currentUser");
  const [value, setValue] = useState(instRating);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState("");

  const setRating = async (event) => {
    event.preventDefault();
    event.target.reset();
    console.log(value);
    const body = {
        instId: id,
        userId: userId,
        userRating: value,
        userReview: review,
      };
    try {
        const res = axios.post("/instructor/setRating", body);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'saved successfully'
        })
      } catch (err) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'some error Happened'
        })
      }
    }
  useEffect(()=>{
  },[]);
  return (
    <div className={InstructorRatingStyles["ratingStars"]}>
      <Box
        sx={{
          
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
      <form onSubmit={setRating}>
        <input
          type="text"
          placeholder="Write a review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
         <Button variant="dark" type="submit" >  save</Button>
      </form>
    </div>
  );
}

export default InstructorRating;