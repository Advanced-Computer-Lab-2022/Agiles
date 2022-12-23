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

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    label: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    radio: {
      marginRight: '8px',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      resize: 'vertical',
    },
    button: {
      backgroundColor: '#a00407',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      float: 'right',
      width:'10%',
    },
  };

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
    <>
      <h1 style={{color:'#a00407',display: 'flex',justifyContent: 'center'}}>Welcome to the canadian chamber of commerce Support Center</h1>
      <div className={style["card"]}>

      <Form onSubmit={handleSubmit} style={styles.form}>
      <Form.Label style={styles.label}>Type of your problem ?</Form.Label>

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
          <Form.Label style={styles.label}>Whats Is Your Problem ?</Form.Label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"  type="txt"
            placeholder="descripe your problem"
            style={styles.input}
            onChange={(e) => setDescription(e.target.value)}
            required></textarea>
        </Form.Group>
        <Button variant="dark" type="submit" style={styles.button}>
          Send
        </Button>
      </Form>
            </div>
    </>
  );
};
export default ReportProblem;
