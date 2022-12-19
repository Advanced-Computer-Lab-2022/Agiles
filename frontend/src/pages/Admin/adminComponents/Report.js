import axios from "axios";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

function Report(props) {
  let el = props.data;
  const [seen, setSeen] = useState(el["isSeen"] ? "seen " : "not seen yet ");
  const [status, setStatus] = useState(el["status"]);
  const [resbutton, setResbutton] = useState(
    status == "pending" ? (
      <button
        onClick={async () => {
          axios
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
      onClick={async () => {
        axios
          .post("/admin/viewReport", {
            reportId: el._id,
          })
          .then(setSeen("seen"));
      }}
    >
      <Accordion.Header>
        <div>{seen}</div>
        <div>
          trainee name: {el.userId.firstname + " " + el.userId.lastname}
        </div>
        <div>course title: {el.courseId.title}</div> <div>status: {status}</div>
      </Accordion.Header>
      <Accordion.Body>
        <div>Description : {el.description}</div>
        <div>{resbutton}</div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default Report;
