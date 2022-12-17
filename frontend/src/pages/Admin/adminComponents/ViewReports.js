import axios from "axios";
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
    <ul>
      {reports.map((el, index) => {
        return el.userId == null ? (
          ""
        ) : (
          <li key={index}>
            <div>{el["isSeen"] ? "seen" : "not seen yet"}</div>
            <div>
              trainee name: {el.userId.firstname + " " + el.userId.lastname}
            </div>
            <div>course title: {el.courseId.title}</div>{" "}
            <div>status: {el.status}</div>
            {el.status == "pending" ? (
              <button onClick={() => handleView(el._id)}> View</button>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ViewReports;
