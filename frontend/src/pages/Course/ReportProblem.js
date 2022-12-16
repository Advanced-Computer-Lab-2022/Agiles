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
  const state = cookies.get("status");
  const [course, setCourse] = useState([]);
  const location = useLocation();
  const progress = state != 1 && location.state.progress;
  const index = state != 1 && new URLSearchParams(location.search).get("idx");
  const course_id = new URLSearchParams(location.search).get("courseId");
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
    };
    try {
      const res = await axios.post(reportUrl, problem);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
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
  const fetchdata = async () => {
    try {
      const res = await axios.get(`/course/${course_id}`);
      setCourse(res.data.firstField);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className={regStyles["mainreg"]}>
      {state == 1 ? (
        <MyCourseInst
          className={regStyles["mainreg"]}
          course_id={course_id}
          course_img={course.imgUrl}
          course_title={course.title}
          course_inst={course.instructorname}
          name={"supportCenter"}
        />
      ) : (
        <RegCourse
          course_id={course_id}
          course_img={course.imgUrl}
          progress={progress}
          course_title={course.title}
          course_inst={course.instructorname}
          name={"supportCenter"}
          idx={index}
        />
      )}
      <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Support Center</label>
        <div className={style["card"]}>
        <label className={style["mainlabel"]}>Report a problem</label>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              name="subject"
              type="radio"
              id={"Technical"}
              value={"Technical"}
              onChange={handleChangeSubject}
              label={"Technical"}
              required
            />
            <Form.Check
              name="subject"
              type="radio"
              id={"Financial"}
              value={"Financial"}
              onChange={handleChangeSubject}
              label={"Financial"}
              required
            />
            <Form.Check
              name="subject"
              type="radio"
              id={"Other"}
              value={"Other"}
              onChange={handleChangeSubject}
              label={"Other"}
              required
            />

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Whats Is Your Problem</Form.Label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                style={{width:'50%'}}
                rows="3"
                type="txt"
                placeholder="descripe your problem"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </Form.Group>
            <Button variant="dark" type="submit" className={style["button"]}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ReportProblem;
