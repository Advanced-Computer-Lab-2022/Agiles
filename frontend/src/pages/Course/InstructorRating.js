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

function InstructorRating() {
  const location = useLocation();
  const course_id = new URLSearchParams(location.search).get("courseId");
  const userId = cookies.get("currentUser");

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState("");
  const [isnstID, setIsnstID] = useState("");
  const [oldReview, setOldReview] = useState([]);

  const setRating = async (event) => {
    event.preventDefault();
    const body = {
      instId: isnstID,
      userId: userId,
      userRating: value,
      userReview: review,
    };
    //check if he already done it before
    try {
      const res = axios.post("/instructor/setRating", body);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let courseData;
      try {
        let res = await axios.get("/course/" + course_id);
        courseData = res.data.instructor;
        console.log("instructorid" + courseData);
        // window.location.reload();
      } catch (err) {
        console.log(err);
      }

      try {
        const res = await axios.get(
          "/instructor/instructorbyid?id=" + courseData
        );

        setIsnstID(res.data._id);
        console.log(isnstID);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [course_id, isnstID]);

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
        {/* <br></br> */}
        <button type="submit">submit Review</button>
      </form>
    </div>
  );
}

export default InstructorRating;
