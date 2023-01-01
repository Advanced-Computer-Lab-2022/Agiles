import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Report from "./Report";
import React, { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../../static/download.gif";

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const url = "/admin/getReports";
    const res = await axios.get(url);
    console.log(res.data);
    setReports(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [change]);

  if (isLoading) return <LoadingScreen loading={true} logoSrc={spinner} />;

  return (
    <>
      <h1
        style={{
          marginLeft: "30px",
          marginTop: "20px",
          marginBottom: "50px",
          color: "rgb(50, 50, 50)",
          fontSize: "36px",
          fontFamily: "Changa, sans-serif",
          fontWeight: "bold",
        }}
      >
        Reports
      </h1>
      <Accordion style={{ margin: "0 5px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            paddingLeft: "15px",
            borderBottom: "1px solid gray",
            paddingBottom: "30px",
            fontSize: "20px",
            fontWeight: "600",
            boxShadow: "inset 0 -1px 0 rgb(0 0 0 / 13%)",
          }}
        >
          <div style={{ width: "20%" }}>username</div>
          <div style={{ width: "20%" }}>problem title</div>{" "}
          <div style={{ width: "20%" }}>Course </div>{" "}
          <div style={{ width: "20%" }}>Status</div>
          <div style={{ width: "20%" }}>Seen</div>
          <div style={{ width: "25%" }}>Category</div>
        </div>

        {reports.map((el, index) => {
          console.log(el);
          return <Report data={el} index={index}></Report>;
        })}
      </Accordion>
    </>
  );
}

export default ViewReports;
