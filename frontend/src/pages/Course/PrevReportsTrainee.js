import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import style from "./PrevReports.module.css";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";

const PrevReportsTrainee = () => {
  const [reports, setReports] = useState([]);
  const [followUp, setFollowUp] = useState("");
  const [reportId, setReportId] = useState("");
  const [followUpArr, setFollowUpArr] = useState([]);

  const handleSubmit = async (event) => {
    const follow = {
      reportId: reportId,
      followUpArr: followUpArr,
    };
    event.preventDefault();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.patch(
        "/individualtrainee/addFollowUp",
        follow,
        config
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Follow Up has been added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error during Add the follow up please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/individualtrainee/viewReportedProblems");
      let jsondata = await res.json();
      if (res.ok) {
        setReports(jsondata);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1
        style={{
          color: "rgb(160, 4, 7)",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        Previous Reports
      </h1>
      <div style={{ width: "75%", marginLeft: "10%" }}>
        <Accordion defaultActiveKey="0">
          {reports.map((report, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <div
                    style={{
                      color:
                        report["status"] === "pending" ? "#A00407" : "#28D770",
                    }}
                  >
                    Problem {index + 1} : {report["title"]}
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <label
                    style={{
                      color:
                        report["status"] === "pending" ? "#A00407" : "#28D770",
                    }}
                  >
                    Status : {report["status"]}
                  </label>
                  <br></br>
                  <label style={{ color: "#A00407" }}>Description :</label>
                  <br></br>
                  {report["description"]}

                  {report["followUp"].length == 0 ? (
                    <span></span>
                  ) : (
                    <>
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey={index + 1000}>
                          <div>
                            <Accordion.Header> Follow Ups</Accordion.Header>
                            <br></br>
                            <Accordion.Body>
                              {report["followUp"].map((follow, indexx) => {
                                return (
                                  <>
                                    <span>
                                      {indexx + 1}. {follow}
                                    </span>
                                    <br></br>
                                  </>
                                );
                              })}
                            </Accordion.Body>
                          </div>
                        </Accordion.Item>
                      </Accordion>
                    </>
                  )}

                  <div>
                    {report["status"] === "pending" ? (
                      <>
                        <div>
                          <Popup
                            trigger={<Button>Add Follow Up</Button>}
                            position="right center"
                          >
                            <div>
                              <form onSubmit={handleSubmit}>
                                <label>Add Follow Up</label>
                                <input
                                  label="Add Follow Up"
                                  id={index}
                                  onChange={(e) => {
                                    setReportId(report["_id"]);
                                    setFollowUpArr([
                                      ...report["followUp"],
                                      e.target.value,
                                    ]);
                                  }}
                                />
                                <Button
                                  variant="success"
                                  type="submit"
                                  onClick={handleSubmit}
                                >
                                  Add Follow Up
                                </Button>
                              </form>
                            </div>
                          </Popup>
                        </div>
                      </>
                    ) : (
                      <span></span>
                    )}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </>
  );
};
export default PrevReportsTrainee;
