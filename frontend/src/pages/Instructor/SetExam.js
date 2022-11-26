import React from "react";
import { useState } from "react";
import axios from "axios";
import CreateCourseStyles from "./SetExam.module.css";
import { Link } from "react-router-dom";
const SetExam = () => {

    const [courseId, setCourseId] = useState("");
    const [questions, setQuestions] = useState("");
    const [firstChoices, setFirstChoices] = useState("");
    const [secondChoices, setSecondChoices] = useState("");
    const [thirdChoices, setThirdChoices] = useState("");
    const [fourthChoices, setFourthChoices] = useState("");
    const [answers, setAnswers] = useState("");

const handleSubmit = async (event) => {

const exam = {
    courseId : courseId,
    questions : questions,
    firstChoices : firstChoices,
    secondChoices : secondChoices,
    thirdChoices : thirdChoices,
    fourthChoices : fourthChoices,
    answers : answers,
};

event.preventDefault();
event.target.reset();
let config = {
  headers: {
    header1: "Access-Control-Allow-Origin",
  },
};

try {
    const res = await axios.post("/instructor/setExam", exam, config);
  } catch (e) {
    console.log(e);
  }
};



return (

  <div className="form">
    <form onSubmit={handleSubmit}>

    <h1>Add an Exam</h1>
    <label>Course ID</label>
    <input
    required
    type="text"
    name="courseId"
    onChange={(e) => setCourseId(e.target.value)}
    />
    <br/>
    <br/>

    <label>Question</label>
    <input
    required
    type="text"
    name="questions"
    onChange={(e) => setQuestions(e.target.value)}
    />
    <br/>
    <br/>
    <label>First choice</label>
    <input
    required
    type="text"
    name="firstChoices"
    onChange={(e) => setFirstChoices(e.target.value)}
    />
    <br/>
    <br/>
    <label>Second choice</label>
    <input
    required
    type="text"
    name="secondChoices"
    onChange={(e) => setSecondChoices(e.target.value)}
    />
    <br/>
    <br/>
    <label>Third Choice</label>
    <input
    required
    type="text"
    name="thirdChoices"
    onChange={(e) => setThirdChoices(e.target.value)}
    />
    <br/>
    <br/>
    <label>Fourth choice</label>
    <input
    required
    type="text"
    name="fourthChoices"
    onChange={(e) => setFourthChoices(e.target.value)}
    />
    <br/>
    <br/>
    <label>Answer</label>
    <select name="answers" id="answers"     onChange={(e) => setAnswers(e.target.value)}>
    <option value="1">First Choice</option>
   <option value="2">Second Choice</option>
    <option value="3">Third choice</option>
   <option value="4">Fourth choice</option>
    </select>
    <br/>
    <br/>
    <input type="submit" value="Create Exam" />
    </form>


  </div>


);
}
export default SetExam;