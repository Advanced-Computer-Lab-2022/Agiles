import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegCourse from "./RegCourse";
import axios from "axios";
import Button from "react-bootstrap/Button";
import regStyles from "./RegCourse.module.css";
import style from "./AskInstructor.module.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function AskInstructor() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newReply, setNewReply] = useState(false);
  const location = useLocation();
  const index = new URLSearchParams(location.search).get("idx");
  const userId = cookies.get("currentUser");
  console.log(location.state);

  const handleSubmitReply = async (e) => {
    let res = await axios.patch("/individualtrainee/addReply", {
      questionId: questions.id,
      reply: newReply,
    });
  };
  const fetchdata = async () => {
    console.log(location.state.course_id);
    console.log(userId);
    setIsLoading(true);
    try {
      if (cookies.get("status") === 1) {
        const url = "instructor/getQuestions";
        const res = await axios.get(url, {
          params: {
            courseId: location.state.course_id,
            instructorId: userId,
          },
        });
        setQuestions(res.data);
      } else {
        const url = "individualtrainee/getQuestions";
        const res = await axios.get(url, {
          params: {
            courseId: location.state.course_id,
            traineeId: userId,
          },
        });
        setQuestions(res.data);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className={style["container"]}>
      <div className={regStyles["mainreg"]}>
        <RegCourse
          course_id={location.state.course_id}
          course_img={location.state.course_img}
          course_title={location.state.course_title}
          course_inst={location.state.course_inst}
          progress={location.state.progress}
          name={"AskInstructor"}
          idx={index}
        />
      </div>
      <div className={style["mainRight"]}>
        {questions.map((el) => {
          console.log(el.replies[0].reply);
          return (
            <div>
              <div>{el.question}</div>

              <div>
                {el.replies.map((replies) => {
                  if (replies.isInstructor == false)
                    return (
                      <div>
                        <div>{replies.reply}</div>
                      </div>
                    );
                })}
              </div>
              <div>
                {el.replies.map((replies) => {
                  if (replies.isInstructor == true)
                    return (
                      <div>
                        <div>{replies.reply}</div>
                      </div>
                    );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <form on onSubmit={handleSubmitReply}>
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
            <Button className={style["button"]} type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AskInstructor;
