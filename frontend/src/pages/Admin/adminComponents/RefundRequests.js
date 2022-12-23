import axios from "axios";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow, TableHead, Table } from "@mui/material";
import Button from "react-bootstrap/Button";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../static/download.gif";
function RefundRequests() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const url = "/admin/refundRequests";
    const res = await axios.get(url);
    setReports(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [change]);

  const handleApprove = async (traineeId, courseId, index) => {
    const url = "/admin/acceptRefund";
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
  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;

  return (
    <>
      <h2 style={{ marginLeft: "25px", marginBottom: "25px" }}>
        Refund Requests
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
          return el.userId == null ? (
            ""
          ) : (
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
    </>
  );
}

export default RefundRequests;
