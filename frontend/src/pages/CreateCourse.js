import React from 'react';
import { useState } from "react";
import axios from "axios";
import "./AddInstructor.css";

const CreateCourse = () => {

    const [title, setTitle] = useState("");
    // const [subject, setSubject] = useState("");
    const [price, setPrice] = useState(""); 
    const [subtitles, setSubtitles] = useState("");
    // const [instructor, setInstructor] = useState("");
    const [shortSummary, setShortSummary] = useState("");
    
    const handleSumbit = async (event) => {
        const course = {title: title, subtitles: subtitles, price:price, shortSummary:shortSummary};
        event.preventDefault();
        event.target.reset();
        let config = {
          headers: {
            header1: "Access-Control-Allow-Origin",
          },
        };
        try {
          const res = await axios.post("/api/instructor/createCourse", course, config);
          console.log(res.data);
        
        } catch (e) {
          console.log(e);
        
        }
      };
  return (
    <div className="contains">
     <h1 className="title">Add A NEW Course</h1>
      <form onSubmit={handleSumbit}>
        <label>
          title <span className="required">*</span>
        </label>
        <input type="text" name="title" placeholder="title.." onChange={(e) => setTitle(e.target.value)} />
        <label>
          subtitles <span className="required">*</span>
        </label>
        <input type="text" name="subtitles" placeholder="subtitles.." onChange={(e) => setSubtitles(e.target.value)} />
        <label>
          price <span className="required">*</span>
        </label>
        <input type="currency" name="price" placeholder="price.." onChange={(e) => setPrice(e.target.value)} />
        <label>
          shortSummary <span className="required">*</span>
        </label>
        <input type="text" name="shortSummary" placeholder="shortSummary.." onChange={(e) => setShortSummary(e.target.value)} />
        
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateCourse;