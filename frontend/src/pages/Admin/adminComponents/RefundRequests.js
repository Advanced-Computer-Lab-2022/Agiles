import axios from "axios";
import React, { useState, useEffect } from "react";
function RefundRequests() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);

  const fetchData = async () => {
    const url = "/admin/refundRequests";
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

export default RefundRequests;
