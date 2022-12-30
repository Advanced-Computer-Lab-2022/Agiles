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
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";

const PrevReportsTrainee = () => {
  const [reports, setReports] = useState([]);
  const [followUp, setFollowUp] = useState("");
  const [reportId, setReportId] = useState("");
  const [followUpArr, setFollowUpArr] = useState([]);
  const [flag, setFlag] = useState(false);

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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "follow up added successfully ",
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
    setFlag(!flag);
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
  }, [flag]);
  return (
    <>
      <h1
        style={{
          color: "rgb(160, 4, 7)",
          margin: "20px auto",
          
        }}
      >
        Reported problems
      </h1>
      <div style={{ width: "75%", marginLeft: "5%" }}>
        <Accordion defaultActiveKey="0">
          {reports.map((report, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Problem {index + 1} : {report["title"]}
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      marginRight: "5%",
                    }}
                  >
                    <Badge
                      bg={report["status"] === "pending" ? "danger" : "success"} style={{marginRight:"10px"}}
                    >
                      {" "}
                      <label> {report["status"]} </label>
                    </Badge>
                    {report["isSeen"] ? (
                      <span>
                        <BsEyeFill />
                      </span>
                    ) : (
                      <span>
                        <BsEyeSlashFill />
                      </span>
                    )}
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <label>
                    <span style={{ color: "#A00407" }}>Description : </span>
                    {report["description"]}
                  </label>

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
                            trigger={
                              <button
                                style={{
                                  backgroundColor: "#a00407",
                                  color: "white",
                                  border: "none",
                                  padding: "5px",
                                  marginTop: "5px",
                                }}
                              >
                                Add Follow Up
                              </button>
                            }
                            position="right center"
                          >
                            <div>
                              <form onSubmit={handleSubmit}>
                                <input
                                  label="Add Follow Up"
                                  id={index}
                                  style={{ width: "100%" }}
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
                                  style={{
                                    backgroundColor: "inherit",
                                    color: "#a00407",
                                    border: "none",
                                    margin: "auto",
                                  }}
                                  onClick={handleSubmit}
                                >
                                  Add
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
