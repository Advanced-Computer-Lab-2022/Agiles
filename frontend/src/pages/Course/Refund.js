//create refund page
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegCourse from "./RegCourse";
import regStyles from "./RegCourse.module.css";
import style from "./Refund.module.css";
import style1 from "../../components/CoursePreview.module.css";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import axios from "axios";
import Cookies from "universal-cookie";

const Refund = () => {
    const location = useLocation();
    const index = new URLSearchParams(location.search).get("idx");
    const [reason, setReason] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [eligible, setEligible] = useState(true);
    const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      width: "90%",
      maxWidth: "550px",
      marginLeft: "5%",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    label: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    radio: {
      marginRight: "8px",
    },
    input: {
      width: "100%",
      maxWidth: "400px",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
      resize: "vertical",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "#a00407",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      float: "right",
      width: "100px",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("individualtrainee/inprogressCourse", {
        courseId: location.state.course_id,
      });
      const items = await axios.post("individualtrainee/getAllItems", {
        courseId: location.state.course_id,
      });

      if (res && items) {
        if (
          res.data.firstField.registered_courses[index].progress >=
          items.data.numberOfItems / 2
        ) {
          setEligible(false);
          console.log("not eligible");
        }
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(location.state.course_id);
        console.log(reason);
      const res = await axios.post("individualtrainee/requestRefund", {
        courseId: location.state.course_id,
        reason: reason
      });
      if(res.data === "success"){
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
          title: "your request has been sent",
        });
    }
    else if(res.data === "already requested"){
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "You have already requested for refund",
            showConfirmButton: false,
            timer: 1500,
          });
    }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill reason field",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <>
          {eligible ? (
            <div className={regStyles["mainreg"]}>
              <RegCourse
                course_id={location.state.course_id}
                course_img={location.state.course_img}
                course_title={location.state.course_title}
                course_inst={location.state.course_inst}
                name="refund"
                progress={location.state.progress}
                idx={index}
              ></RegCourse>
              <div className={regStyles["mainRight"]}>
                <label className={style1["mainlabel"]}>Request Refund</label>
                <div className={style["sorry"]}>
                  <h4 className={style["right"]}>
                    We are sorry you are unhappy with the course{" "}
                    {location.state.course_title} and would like a refund to
                    help us process your request, please include a reason
                  </h4>
                </div>
                <div className={style["card"]}>
                  <Form onSubmit={handleSubmit} style={styles.form}>
                    <Form.Label style={styles.label}>Reason</Form.Label>
                    <Form.Control
                      type="text"
                      style={styles.input}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                    <Button variant="dark" type="submit" style={styles.button}>
                      Send
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          ) : ( <div className={regStyles["mainreg"]}>
          <RegCourse
            course_id={location.state.course_id}
            course_img={location.state.course_img}
            course_title={location.state.course_title}
            course_inst={location.state.course_inst}
            name="refund"
            progress={location.state.progress}
            idx={location.state.index}
          ></RegCourse>
          <div className={regStyles["mainRight"]}>
            <label className={style1["mainlabel"]}>Request Refund</label>
            <div className={style["sorry"]}>
              <h4 className={style["right"]}>
                We are sorry you are unhappy with the course{" "}
                {location.state.course_title} and would like a refund but <b>we cannot process your request because you have completed more than 50% of the course</b>
              </h4>
            </div>
            </div>
            </div>)}
        </>
      )}
    </>
  );
};

export default Refund;
