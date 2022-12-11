import axios from "axios";
import React, { useState, useEffect } from "react";

function ViewRequests() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "/admin/accessRequests";
      const res = await axios.get(url);
      console.log(res.status);
      console.log(res.data);
      setReports(res.data);
      console.log(reports);
    };
    fetchData();
  }, []);

  const handleApprove = () => {};
  return (
    <ul>
      {reports.map((el) => {
        if (el.traineeId == null || el.courseId == null) return "";
        return (
          <li>
            <div>trainee email: {el.email}</div>
            <div>
              trainee name:{" "}
              {el.traineeId.firstname + " " + el.traineeId.lastname}
            </div>
            <div>course title: {el.courseId.title}</div> <div>{el.status}</div>
            <button onClick={handleApprove}> Approve</button>
          </li>
        );
      })}
    </ul>
  );
}

export default ViewRequests;
