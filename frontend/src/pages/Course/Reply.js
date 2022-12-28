import React from "react";

function Reply({ reply }) {
  let str = reply.isInstructor ? "Professor:" : "You:";

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
