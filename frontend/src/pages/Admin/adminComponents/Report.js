import axios from "axios";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

function Report(props) {
  let el = props.data;
  let initialSeen = el.isSeen ? "seen" : "not seen yet ";
  const [seen, setSeen] = useState(initialSeen);
  const [status, setStatus] = useState(el["status"]);

  return (
    <Accordion.Item
      eventKey={props.index}
      onClick={async () => {
        if (seen == "seen") return;
        setSeen("seen");
        await axios.post("/admin/viewReport", {
          reportId: el._id,
        });
      }}
    >
      <Accordion>
      <Accordion.Header>
        <div style={{ display:"inline-flex",   width: "80%" }}>
          <div style={{ width: "20%", display: "flex", justifyContent:"center" }}>{el.username} </div>
          <div style={{ width: "20%", display: "flex", justifyContent:"center" }}>{el.title}</div>
          <div style={{ width: "20%" , display: "flex", justifyContent:"center"  }}> {el.courseId.title}</div>{" "}
          <div style={{ width: "20%", display: "flex", justifyContent:"center" }}>
              <Badge
              bg={status === "pending" ? "danger" : "success"}
              style={{  width:"50%",justifyContent:"center",display:"flex" }}
            >
              <label> {status} </label>
            </Badge>
          </div>
          {/*<div style={{ width: "25%" }}> {el.reportType}</div>*/}
          <div style={{  width:"20%", display: "flex", justifyContent:"center" }}>{seen}</div>
        </div>
        <div style={{ width: "25%", display: "flex", justifyContent:"center" }}> {el.reportType}</div>
      </Accordion.Header>
      <Accordion.Body>
        <div>Description : {el.description}</div>
        {el.followUp.length === 0 ? (
          ""
        ) : (
          <div>
              <Accordion>
              <Accordion.Header > Follow Ups</Accordion.Header>
              <br></br>
              <Accordion.Body >
                {el.followUp.map((follow, indexx) => {
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
              </Accordion>
            </div>
        )}

        {status == "pending" ? (
          <Button
            style={{ marginLeft: "auto", display: "block",color:"white",backgroundColor:"green",border:"none" }}
            onClick={async () => {
              setStatus("resolved");
              await axios.post("/admin/resolveReport", {
                reportId: el._id,
              });
            }}
          >
            {" "}
            Mark as Resolved{" "}
          </Button>
        ) : (
          ""
        )}
      </Accordion.Body>
    </Accordion>
    </Accordion.Item>
  );
}

export default Report;
