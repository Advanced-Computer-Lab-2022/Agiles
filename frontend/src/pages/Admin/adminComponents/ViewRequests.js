import axios from "axios";
import React, { useState, useEffect } from "react";

function ViewRequests() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);

  const fetchData = async () => {
    const url = "/admin/accessRequests";
    const res = await axios.get(url);
    console.log(res.status);
    console.log(res.data);
    setReports(res.data);
    console.log(reports);
  };
  useEffect(() => {
    fetchData();
  }, [change]);

  const handleApprove = async (traineeId, courseId, index) => {
    const url = "/admin/grantAccess";
    // console.log(traineeId);
    // console.log(courseId);
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
    <ul>
      {reports.map((el, index) => {
        if (el.traineeId == null || el.courseId == null) return "";
        return (
          <li key={index}>
            <div>trainee email: {el.email}</div>
            <div>
              trainee name:{" "}
              {el.traineeId.firstname + " " + el.traineeId.lastname}
            </div>
            <div>course title: {el.courseId.title}</div> <div>{el.status}</div>
            {el.status == "pending" ? (
              <button
                onClick={() =>
                  handleApprove(el.traineeId._id, el.courseId._id, index)
                }
              >
                {" "}
                Approve
              </button>
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ViewRequests;
