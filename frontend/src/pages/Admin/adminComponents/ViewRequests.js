import { TableCell, TableRow, TableHead, Table } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../static/download.gif";
import Request from "./Request";
function ViewRequests() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const url = "/admin/accessRequests";
    const res = await axios.get(url);
    setReports(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;
  return (
    <>
      <h2 style={{ marginLeft: "25px", marginBottom: "25px" }}>
        Enroll Requests
      </h2>

      <Table>
        <TableHead
          style={{
            verticalAlign: "text-top",
            width: "100%",
            paddingLeft: "15px",
            borderBottom: "1px solid gray",
            paddingBottom: "30px",

            boxShadow: "inset 0 -1px 0 rgb(0 0 0 / 13%)",
          }}
        >
          <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
            Trainee Email
          </TableCell>
          <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
            Trainee Name
          </TableCell>
          <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
            Course Title
          </TableCell>
          <TableCell
            style={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
          >
            Status
          </TableCell>
        </TableHead>
        {reports.map((el, index) => {
          if (el.traineeId == null || el.courseId == null) return "";

          return <Request data={el} index={index} />;
        })}
      </Table>
    </>
  );
}

export default ViewRequests;
