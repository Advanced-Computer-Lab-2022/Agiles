import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [subtitles, setSubtitles] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [courseTotalHours, setCourseTotalHours] = useState("");
  const [subtitleTotalHours, setSubtitleTotalHours] = useState("");
  const [language, setLanguage] = useState("");

  const handleSubmit = async (event) => {
    const course = {
      instructor: instructor,
      title: title,
      subtitles: subtitles,
      price: price,
      description: shortSummary,
      subject: subject,
      totalHourseOfCourse: courseTotalHours,
      totalHourseOfSubtitles: subtitleTotalHours,
      language: language,
      discount: 0,
      rating: 0,
      exercises: [],
    };
    event.preventDefault();
    // event.target.reset();
    let config = {
      headers: {
        header1: "Access-Control-Allow-Origin",
      },
    };
    try {
      const res = await axios.post("/instructor/addCourse", course, config);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="contains">
      <h1 className="title">Add A new Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="title"
            placeholder="title.."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>subtitles</label>

          <input
            type="text"
            name="subtitles"
            placeholder="subtitles.."
            onChange={(e) => setSubtitles(e.target.value)}
          />
        </div>
        <div>
          <label>
            price in $ <span className="required">*</span>
          </label>
          <input
            required
            // type="currency"
            type="text"
            name="price"
            placeholder="price.."
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>
            shortSummary <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="shortSummary"
            placeholder="shortSummary.."
            onChange={(e) => setShortSummary(e.target.value)}
          />
        </div>
        <div>
          <label>subject</label>
          <input
            type="text"
            name="subject"
            placeholder="subject.."
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label>
            instructor username <span className="required">*</span>
          </label>
          <input
            required
            type="text"
            name="username"
            placeholder="username.."
            onChange={(e) => setInstructor(e.target.value)}
          />
        </div>
        <div>
          <label>language</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
        <div>
          <label>course total hours</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setCourseTotalHours(e.target.value)}
          />
        </div>
        <div>
          <label>subtitle total hours</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setSubtitleTotalHours(e.target.value)}
          />
        </div>

        <input type="submit" value="create Course" />
      </form>
    </div>
  );
};

export default CreateCourse;
