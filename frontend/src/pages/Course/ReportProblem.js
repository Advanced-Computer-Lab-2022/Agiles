import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./ReportProblem.module.css";
import Cookies from "universal-cookie";
import { useLocation } from "react-router-dom";
import MyCourseInst from "../Instructor/MyCourseInst";
import RegCourse from "./RegCourse";
import regStyles from "./RegCourse.module.css";
const cookies = new Cookies();

const ReportProblem = () => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

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
  const state = cookies.get("status");
  const location = useLocation();
  const progress = state != 1 && location.state.progress;
  const index = state != 1 && new URLSearchParams(location.search).get("idx");
  const course_id = new URLSearchParams(location.search).get("courseId");
  const course_img = localStorage.getItem("course_img");
  const course_title = localStorage.getItem("course_title");
  const course_inst = localStorage.getItem("course_inst");
  const reportUrl =
    state == 1
      ? "/instructor/reportProblem"
      : "/individualtrainee/reportProblem";

  const handleChangeSubject = (event) => {
    setReportType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const problem = {
      courseId: course_id,
      reportType: reportType,
      description: description,
      title: title,
    };
    try {
      const res = await axios.post(reportUrl, problem);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your problem has been submitted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Fill Both Fields",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className={regStyles["mainreg"]}>
      {state == 1 ? (
        <MyCourseInst
          className={regStyles["mainreg"]}
          course_id={course_id}
          course_img={course_img}
          course_title={course_title}
          course_inst={course_inst}
          name={"supportCenter"}
        />
      ) : (
        <RegCourse
          course_id={course_id}
          course_img={course_img}
          progress={progress}
          course_title={course_title}
          course_inst={course_inst}
          name={"supportCenter"}
          idx={index}
        />
      )}
      <div className={style["mainRight"]}>
        <label className={style["mainlabel"]}>Support Center</label>
        <div className={style["card"]}>
          <h1 >
            Report a problem
          </h1>

          <Form onSubmit={handleSubmit} style={styles.form}>
            <Form.Label style={styles.label}>Problem Title</Form.Label>

            <Form.Check
              name="subject"
              type="radio"
              id={"Technical"}
              value={"Technical"}
              style={styles.radio}
              onChange={handleChangeSubject}
              label={"Technical"}
              required
            />
            <Form.Check
              name="subject"
              type="radio"
              id={"Financial"}
              value={"Financial"}
              style={styles.radio}
              onChange={handleChangeSubject}
              label={"Financial"}
              required
            />
            <Form.Check
              name="subject"
              type="radio"
              id={"Other"}
              value={"Other"}
              style={styles.radio}
              onChange={handleChangeSubject}
              label={"Other"}
              required
            />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={styles.label}>Problem Title </Form.Label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="1"
                type="txt"
                placeholder="title"
                style={styles.input}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></textarea>
              <Form.Label style={styles.label}>Problem Description</Form.Label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                type="txt"
                placeholder="describe your problem"
                style={styles.input}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </Form.Group>
            <Button variant="dark" type="submit" style={styles.button}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ReportProblem;
