import { TableCell, TableRow, TableHead, Table } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function ViewRequests() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);

  const fetchData = async () => {
    const url = "/admin/accessRequests";
    const res = await axios.get(url);
    setReports(res.data);
  };
  useEffect(() => {
    fetchData();
  }, [change]);

  const handleApprove = async (traineeId, courseId, index) => {
    const url = "/admin/grantAccess";
    try {
      axios
        .post(url, { traineeId: traineeId, courseId: courseId })
        .then(setChange(!change));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Table>
      <TableHead>
        <TableCell>Trainee Email</TableCell>
        <TableCell>Trainee Name</TableCell>
        <TableCell>Course Title</TableCell>
        <TableCell style={{ textAlign: "center" }}>Status</TableCell>
      </TableHead>
      {reports.map((el, index) => {
        if (el.traineeId == null || el.courseId == null) return "";

        return (
          <TableRow style={{ verticalAlign: "text-top" }} key={index}>
            <TableCell>{el.email}</TableCell>
            <TableCell>
              {el.traineeId.firstname + " " + el.traineeId.lastname}
            </TableCell>
            <TableCell>{el.courseId.title}</TableCell>{" "}
            <TableCell style={{ textAlign: "center" }}>
              {el.status}
              {el.status == "pending" ? (
                <Button
                  style={{ marginLeft: "15px" }}
                  onClick={() =>
                    handleApprove(el.traineeId._id, el.courseId._id, index)
                  }
                >
                  {" "}
                  Approve
                </Button>
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default ViewRequests;
