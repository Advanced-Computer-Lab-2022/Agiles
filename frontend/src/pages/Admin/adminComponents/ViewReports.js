import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Report from "./Report";
import React, { useState, useEffect } from "react";
function ViewReports() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);

  const fetchData = async () => {
    const url = "/admin/getReports";
    const res = await axios.get(url);
    setReports(res.data);
  };
  useEffect(() => {
    fetchData();
  }, [change]);

  const handleApprove = async (traineeId, courseId, index) => {
    const url = "/admin/grantAccess";
    try {
      const res = await axios.post(url, {
        traineeId: traineeId,
        courseId: courseId,
      });
      setChange(!change);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Accordion style={{ margin: "0 5px" }} defaultActiveKey={-1}>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "15px",
          borderBottom: "1px solid gray",
          paddingBottom: "30px",
          fontSize: "20px",
          fontWeight: "600",
          boxShadow: "inset 0 -1px 0 rgb(0 0 0 / 13%)",
        }}
      >
        <div style={{ width: "25%" }}>Trainee Name</div>
        <div style={{ width: "25%" }}>Course Title</div>{" "}
        <div style={{ width: "25%" }}>Status</div>
        <div style={{ width: "25%" }}>Seen</div>
        <div style={{ width: "25%" }}></div>
      </div>

      {reports.map((el, index) => {
        return el.userId == null ? (
          ""
        ) : (
          <Report data={el} index={index}></Report>
        );
      })}
    </Accordion>
  );
}

export default ViewReports;
