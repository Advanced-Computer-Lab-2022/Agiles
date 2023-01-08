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
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

function InstructorRating({ id, instRating, instReview, courseId }) {
  const userId = cookies.get("currentUser");
  const [value, setValue] = useState(instRating);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState(instReview);
  const [view, setView] = useState(instRating != 0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  const delRating = async () => {
    setOpen(false);
    try {
      const res = await axios.delete("/individualtrainee/deleteRating", {
        params: { instId: id },
      });
      setView(false);
      setReview("");
      setValue(0);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "delete successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };
  const setRating = async (event) => {
    event.preventDefault();
    event.target.reset();
    const body = {
      instId: id,
      userId: userId,
      courseId: courseId,
      userRating: value,
      userReview: review,
    };
    try {
      const res = axios.post("/individualtrainee/setRating", body);
      setView(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "saved successfully",
      });
    } catch (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "some error Happened",
      });
    }
  };

  useEffect(() => {}, []);
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
          placeholder={instReview == "" && "write your review"}
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <Button
          variant="dark"
          type="submit"
          style={{
            backgroundColor: 'green',
            borderRadius: 0,
            width: "7rem",
            borderRadius: "0.5rem",
            border: "none",
          }}
        >
          {" "}
          save
        </Button>
      </form>
      <Modal open={open} onClose={handleClose}  >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Your Review?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
          Are you sure you want to delete your review?
          </Typography>
          <Button onClick={handleClose} variant="light" style={{
              borderRadius: 0,
              border: "none",
              marginTop: "0.5rem",
              marginRight: "0.5rem",
            }}>cancel</Button>
          <Button variant="dark"  style={{
              borderRadius: 0,
              border: "none",
              marginTop: "0.5rem",
            }} onClick={delRating}>Yes,delete my review</Button>

        </Box>
      </Modal>
      <div>
        {view && (
          <Button
            variant="dark"
            onClick={handleOpen}
            type="submit"
            style={{
              backgroundColor: "darkRed",
              borderRadius: 0,
              width: "7rem",
              borderRadius: "0.5rem",
              border: "none",
              marginTop: "0.5rem",
            }}
          >
            {" "}
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default InstructorRating;
