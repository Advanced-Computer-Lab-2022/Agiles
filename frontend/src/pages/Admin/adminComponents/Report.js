import axios from "axios";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import style from "./Report.module.css";
import Button from "react-bootstrap/Button";

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
      <Accordion.Header>
        <div style={{ display: "flex", width: "80%" }}>
          <div style={{ width: "20%" }}> {el.username} </div>
          <div style={{ width: "20%" }}>{el.title}</div>
          <div style={{ width: "20%" }}> {el.courseId.title}</div>{" "}
          <div style={{ width: "20%" }}> {status}</div>
          <div style={{ width: "20%" }}>{seen}</div>
        </div>
      </Accordion.Header>
      <Accordion.Body
      // style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>Description : {el.description}</div>
        {el.followUp.length == 0 ? (
          ""
        ) : (
          <div>
            Follow ups :{" "}
            {el.followUp.map((followup, index) => (
              <div>{index + 1 + ": " + followup}</div>
            ))}
          </div>
        )}

        {status == "pending" ? (
          <Button
            style={{ margin: "auto", display: "block" }}
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
    </Accordion.Item>
  );
}

export default Report;
