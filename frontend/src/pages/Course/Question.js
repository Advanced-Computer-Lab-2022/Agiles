import Button from "react-bootstrap/Button";
import style from "./AskInstructor.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Reply from "./Reply";
function Question({
  el,
  index,
  length,
  isInstructor,
  instructor,
  studentName,
  instructorName,
}) {
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(el.replies);

  const handleSubmitReply = async (e, qID) => {
    e.preventDefault();
    const url = isInstructor
      ? "/instructor/addReply"
      : "/individualtrainee/addReply";
    let res = await axios.patch(url, {
      questionId: qID,
      reply: newReply,
    });
    setReplies([...replies, { reply: newReply, isInstructor: isInstructor }]);
    setNewReply("");
  };
  return (
    <div style={{ margin: "15px 0" }}>
      <div>
        <h3>
          Q{length - index}: {el.question}
        </h3>
        <div style={{ color: "rgb(170,170,170)" }}>
          {studentName
            ? "Asked by: " + studentName
            : "Answered by: " + instructorName}
        </div>
      </div>
      <div>
        {replies.map((reply, index) => {
          return <Reply instructor={instructor} index={index} reply={reply} />;
        })}
      </div>
      <div>
        <form>
          <textarea
            style={{ margin: "15px 0" }}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="txt"
            placeholder="Reply"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            required
          ></textarea>
          <div>
            <Button
              style={{ marginTop: "15px" }}
              className={style["button"]}
              type="reply"
              onClick={(e) => handleSubmitReply(e, el._id)}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Question;
