import Button from "react-bootstrap/Button";
import style from "./AskInstructor.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Reply from "./Reply";
function Question({ el, index }) {
  const [newReply, setNewReply] = useState("");

  const handleSubmitReply = async (e, qID) => {
    e.preventDefault();
    let res = await axios.patch("/individualtrainee/addReply", {
      questionId: qID,
      reply: newReply,
    });
  };
  return (
    <div>
      <div>
        {" "}
        <h1>Q: {el.question}</h1>
      </div>
      <div>
        {el.replies.map((reply) => {
          return <Reply reply={reply} />;
        })}
      </div>
      <div>
        <form>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="txt"
            placeholder="Reply"
            //style={styles.input}
            onChange={(e) => setNewReply(e.target.value)}
            required
          ></textarea>
          <div>
            <Button
              style={{ marginTop: "15px" }}
              className={style["button"]}
              type="reply"
              onClick={(e) => handleSubmitReply(e, el._id)}
              // onClick={handleSubmitReply}
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
