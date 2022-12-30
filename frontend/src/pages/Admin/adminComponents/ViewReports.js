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
      <h2 style={{ marginLeft: "25px", marginBottom: "25px" }}>Reports</h2>
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
          <div style={{ width: "20%" }}>Problem Title</div>{" "}
          <div style={{ width: "20%" }}>Course Title</div>{" "}
          <div style={{ width: "20%" }}>Status</div>
          <div style={{ width: "20%" }}>Seen</div>
          <div style={{ width: "25%" }}></div>
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
