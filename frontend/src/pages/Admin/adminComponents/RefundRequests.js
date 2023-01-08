import axios from "axios";
import React, { useState, useEffect } from "react";
import { TableCell, TableRow, TableHead, Table } from "@mui/material";
import Button from "react-bootstrap/Button";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../static/download.gif";
import Request from "./Request";

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

  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;

  return (
    <>
      <h1  style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginBottom: "50px",
          color: "rgb(50, 50, 50)",
          fontSize: "36px",
          fontFamily: "Changa, sans-serif",
          fontWeight: "bold",
        }}>
        Refund Requests
      </h1>
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
          <TableCell
            style={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}
          >
            Reason
          </TableCell>
        </TableHead>
        {reports.map((el, index) => {
          return el.traineeId == null ? (
            ""
          ) : (
            <Request
              url={"/admin/acceptRefund"}
              data={el}
              index={index}
              email={el.traineeId.email}
            />
            // <TableRow style={{ verticalAlign: "text-top" }} key={index}>
            //   <TableCell>{el.traineeId.email}</TableCell>
            //   <TableCell>
            //     {el.traineeId.firstname + " " + el.traineeId.lastname}
            //   </TableCell>
            //   <TableCell>{el.courseId.title}</TableCell>{" "}
            //   <TableCell style={{ textAlign: "center" }}>
            //     {el.status}
            //     {el.status == "pending" ? (
            //       <Button
            //         style={{ marginLeft: "15px" }}
            //         onClick={() =>
            //           handleApprove(el.traineeId._id, el.courseId._id, index)
            //         }
            //       >
            //         {" "}
            //         Approve
            //       </Button>
            //     ) : (
            //       ""
            //     )}
            //   </TableCell>
            // </TableRow>
          );
        })}
      </Table>
    </>
  );
}

export default RefundRequests;
