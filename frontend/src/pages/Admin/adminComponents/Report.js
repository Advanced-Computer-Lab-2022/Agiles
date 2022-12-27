import axios from "axios";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import style from "./Report.module.css";
function Report(props) {
  let el = props.data;
  let initialSeen = el.isSeen ? "seen " : "not seen yet ";
  const [seen, setSeen] = useState(initialSeen);
  const [status, setStatus] = useState(el["status"]);
  const [resbutton, setResbutton] = useState(
    status == "pending" ? (
      <button
        // style={{
        //   padding: "10px",
        //   backgroundColor: "rgb(15, 233, 8)",
        //   fontWeight: 500,
        //   border: "none",
        // }}
        className={style["success"]}
        onClick={async () => {
          await axios
            .post("/admin/ResolveReport", {
              reportId: el._id,
            })
            .then(setStatus("resolved"))
            .then(setResbutton(""));
        }}
      >
        {" "}
        Mark as Resolved{" "}
      </button>
    ) : (
      ""
    )
  );
  return (
    <Accordion.Item
      eventKey={props.index}
      onClick={async () => {
        await axios
          .post("/admin/viewReport", {
            reportId: el._id,
          })
          .then(setSeen("seen"));
      }}
    >
      <Accordion.Header>
        <div style={{ display: "flex", width: "80%" }}>
          <div style={{ width: "25%" }}>
            {el.userId.firstname + " " + el.userId.lastname}
          </div>
          <div style={{ width: "25%" }}> {el.courseId.title}</div>{" "}
          <div style={{ width: "25%" }}> {status}</div>
          <div style={{ width: "25%" }}>{seen}</div>
        </div>
      </Accordion.Header>
      <Accordion.Body
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>Description : {el.description}</div>
        <div style={{ width: "50%" }}>{resbutton}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Report;
