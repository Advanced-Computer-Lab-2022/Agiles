import React from "react";

function Reply({ reply, instructor }) {
  let str = reply.isInstructor ? "Instructor:" : "You:";
  if (instructor) {
    str = reply.isInstructor ? "You:" : "Student:";
  }
  return (
    <div>
      <div>
        <div>{str}</div>
        <div>
          {" "}
          {"\t"}
          <span style={{ paddingLeft: "10px" }}>{reply.reply}</span>
        </div>
      </div>
    </div>
  );
}

export default Reply;
