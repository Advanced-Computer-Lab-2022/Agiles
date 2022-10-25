import { useState } from "react";
import axios from "axios";
// import searchCourseStyles from "./SearchCourse.module.css"
import "./AddInstructor.css";
import React from 'react'

function SearchCourse() {
    const [subject, setSubject] = useState("");
    const [title, setTitle] = useState("");
    const [instructor, setInstructor] = useState("");
    const handleSumbit = async (event) => {
        const course = { title: title, subject: subject, instructor: instructor};
        event.preventDefault();
        event.target.reset();
        let config = {
          headers: {
            header1: "Access-Control-Allow-Origin",
          },
        };
        try {
          const res = await axios.post("/api/instructor/SearchCourse", course, config);
          console.log(res.data);
        
        } catch (e) {
          console.log(e);
        
        }
      };
  return (
    <div className="contains">
    <h1 className="title">Search for a Course</h1>
     <form onSubmit={handleSumbit}>
       <label>
         Title <span className="required">*</span>
       </label>
       <input type="text" name="Title" placeholder="title.." onChange={(e) => setTitle(e.target.value)} />
       <label>
         Subject <span className="required">*</span>
       </label>
       <input type="text" name="sbject"  placeholder="subject.." onChange={(e) => setSubject(e.target.value)}/><label>
         instructor <span className="required">*</span>
       </label>
       <input type="text" name="instructor"  placeholder="instructor.." onChange={(e) => setInstructor(e.target.value)}/>

       <input type="submit" />
     </form>
   </div>
  )
}

export default SearchCourse;