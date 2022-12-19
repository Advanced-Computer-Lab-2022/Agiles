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
  const handleView = async (id) => {};

  return (
    <Accordion defaultActiveKey={-1}>
      {reports.map((el, index) => {
        return el.userId == null ? "" : <Report data={el}></Report>;
      })}
    </Accordion>
  );
}

export default ViewReports;
