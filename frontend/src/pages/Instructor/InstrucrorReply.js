import React from "react";

function InstrucrorReply({ reply }) {
  let str = reply.isInstructor ? "You:" : "Student:";

  return (
    <div>
      <div>
        <div>
          {" "}
          <span style={{ paddingLeft: "10px" }}>
            {str} {"\t"}
            {reply.reply}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InstrucrorReply;
