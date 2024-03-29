import axios from "axios";
import { useEffect, useState } from "react";
import style from "./PrevReports.module.css";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Accordion from "react-bootstrap/Accordion";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Badge from "react-bootstrap/Badge";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
const PrevReports = () => {
  const [reports, setReports] = useState([]);
  const [followUp, setFollowUp] = useState("");
  const [isloading, setIsLoading] = useState(false);
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
      const res = await axios.patch("/instructor/addFollowUp", follow, config);
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
    setFlag(!flag);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("/instructor/viewReportedProblems");
      let jsondata = await res.json();
      if (res.ok) {
        setReports(jsondata);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [flag]);
  return (
    <div className={style["reportedProblem"]}>
    {isloading && <LoadingScreen loading={true} logoSrc={spinner} />}
    <h1> Reported problems</h1>
    <hr style={{ width: "75%" }}></hr>
    <div style={{ width: "75%", marginLeft: "2%" }}>
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
                    bg={report["status"] === "pending" ? "danger" : "success"}
                    style={{ marginRight: "10px" }}
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
                <label style={{ marginBottom: "20px" }}>
                  <span style={{ color: "#A00407" }}>Description : </span>
                  {report["description"]}
                </label>

                {report["followUp"].length == 0 ? (
                  <span></span>
                ) : (
                  <>
                    <Accordion defaultActiveKey="0" flush>
                      <Accordion.Item eventKey={index + 1000}>
                          <Accordion.Header> Follow Ups</Accordion.Header>
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
                      </Accordion.Item>
                    </Accordion>
                  </>
                )}

                <div>
                  {report["status"] === "pending" ? (
                    <>
                      <div style={{ marginTop: "10px" }}>
                        <Popup
                          contentStyle={{ width: "50%", padding: "15px" }}
                          trigger={
                            <button
                              style={{
                                backgroundColor: "#a00407",
                                color: "white",
                                border: "none",
                                padding: "8px",
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
                              <textarea
                                label="Add Follow Up"
                                id={index}
                                style={{ width: "100%", height: "10vh" }}
                                onChange={(e) => {
                                  setReportId(report["_id"]);
                                  setFollowUpArr([
                                    ...report["followUp"],
                                    e.target.value,
                                  ]);
                                }}
                                required
                              />
                              <Button
                                variant="success"
                                type="submit"
                                style={{
                                  backgroundColor: "#a00407",
                                  fontColor: "#111111",
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
  </div>
  );
};
export default PrevReports;
