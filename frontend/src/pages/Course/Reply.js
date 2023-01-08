import React from "react";
import { useState } from "react";

function Reply({ reply, instructor }) {
  let str = reply.isInstructor ? "Instructor:" : "You:";
  if (instructor) {
    str = reply.isInstructor ? "You:" : "Student:";
  }
  return (
    <div>
      <div>
        <span style={{ paddingLeft: "20px", fontWeight: "500" }} >{str} {reply.reply} </span>
      </div>
    </div>
  );
}

export default Reply;
