import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./ReportProblem.module.css";


const ReportProblem = () => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeSubject = (event) => {
    setReportType(event.target.value);
  };

  const handleSubmit = async (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const courseId = urlParams.get("courseId");
    const problem = {
      courseId: courseId,
      reportType: reportType,
      description: description,
    };
    event.preventDefault();
    event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post(
        "/instructor/reportProblem",
        problem,
        config
      );
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
    /*
    <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Type Of Your Problem
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Technical"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Technical"
              control={<Radio />}
              label="Technical"
              onClick={() => setReportType("Technical")}
            />
            <FormControlLabel
              value="Financial"
              control={<Radio />}
              label="Financial"
              onClick={() => setReportType("Financial")}
            />
            <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              onClick={() => setReportType("Other")}
            />
          </RadioGroup>
        </FormControl>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Select aria-label="Default select example">
            <option>What is the type of your problem</option>
            <option
              value="Technical"
              onClick={(e) => setReportType(e.target.value)}
            >
              Technical
            </option>
            <option
              value="Financial"
              onClick={(e) => setReportType(e.target.value)}
            >
              Financial
            </option>
            <option
              value="Other"
              onClick={(e) => setReportType(e.target.value)}
            >
              Other
            </option>
          </Form.Select>
        </Form.Group>
    */
  };

  return (
    <>
      <h1>Welcome to the canadian chamber of commerce Support Center</h1>
      <div className={style["card"]}>

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
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"  type="txt"
            placeholder="descripe your problem"
            onChange={(e) => setDescription(e.target.value)}
            required></textarea>
        </Form.Group>
        <Button variant="dark" type="submit" className={style["button"]}>
          Send
        </Button>
      </Form>
            </div>
    </>
  );
};
export default ReportProblem;
