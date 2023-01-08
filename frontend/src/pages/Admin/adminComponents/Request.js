import { TableCell, TableRow, TableHead, Table } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../static/download.gif";
import Badge from "react-bootstrap/Badge";

function Request(props) {
  const el = props.data;
  const index = el.index;
  const url = props.url;
  const email = el.email ? el.email : el.traineeId.email;
  const [status, setStatus] = useState(el.status);

  const handleApprove = async (traineeId, courseId, index) => {
    try {
      setStatus("Approved");
      await axios.post(url, { traineeId: traineeId, courseId: courseId });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TableRow style={{ verticalAlign: "text-top" }} key={index}>
      <TableCell>{email}</TableCell>
      <TableCell>
        {el.traineeId.firstname + " " + el.traineeId.lastname}
      </TableCell>
      <TableCell>{el.courseId.title}</TableCell>{" "}
      <TableCell style={{ textAlign: "center" }}>
      <Badge
              bg={status === "pending" ? "danger" : "success"}
              style={{ marginRight: "10px" }}
            >
              <label> {status} </label>
            </Badge>
        {status == "pending" ? (
          <Button
          style={{ marginLeft: "15px",color:"white",border:"none" }}
          onClick={() =>
              handleApprove(el.traineeId._id, el.courseId._id, index)
            }
          >
            approve
          </Button>
        ) : (
          ""
        )}
      </TableCell>
      {el.reason ? (
        <TableCell style={{ textAlign: "center" }}>{el.reason}</TableCell>
      ) : (
        ""
      )}
    </TableRow>
  );
}

export default Request;
