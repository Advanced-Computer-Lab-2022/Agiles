import React, { useState } from "react";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";

function InstructorOwnCourses() {
  const [courses, SetCourses] = useState([]);
  const [name, setName] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [subject, setSubject] = useState("");
  const [upperBound, setUpperBound] = useState("");
  const [lowerBound, setLowerBound] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleUpperBoundChange = (event) => {
    setUpperBound(event.target.value);
  };
  const handleLowerBoundChange = (event) => {
    setLowerBound(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    setFirstLoad(false);

    if (name == "") {
      alert("please enter your name");
    } else if (subject == "" && lowerBound == null && upperBound == null) {
      alert("please fill in at least one filter cell");
    } else {
      let url = "/instructor/filterCourses/?";
      if (!(lowerBound == "")) {
        url += "lowerBound=" + lowerBound + "&";
      }
      if (!(upperBound == "")) {
        url += "upperBound=" + upperBound + "&";
      }
      if (subject != "") {
        url += "subject=" + subject + "&";
      }

      url += `username=${name}`;
      console.log(url);
      let data = await axios.get(url);
      SetCourses(data.data);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setFirstLoad(false);

    if (name == "") {
      alert("please enter your name");
    } else {
      let data = await axios.get(
        `/instructor/searchCourses/?search=${searchString}&instructor=${name}`
      );
      SetCourses(data.data);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFirstLoad(false);
    if (name == "") {
      alert("please enter your name");
    }
    let data = await axios.get(
      `/instructor/listCourseTitles/?username=${name}`
    );
    SetCourses(data.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input required type="text" value={name} onChange={handleChange} />
        </label>
        <input type="submit" value="View All Courses" />
      </form>
      <div>Search Your Courses</div>

      <form onSubmit={handleSearchSubmit}>
        <input
          required
          type="text"
          value={searchString}
          placeholder="Search your courses"
          onChange={handleSearchChange}
        />
        <input type="submit" value="Search" />
      </form>
      <div>Filter Your Courses by Subject and/or Price</div>
      <form onSubmit={handleFilterSubmit}>
        <input
          type="text"
          value={subject}
          placeholder="subject filter"
          onChange={handleSubjectChange}
        />
        <input
          type="number"
          value={lowerBound}
          placeholder="price lower bound"
          onChange={handleLowerBoundChange}
        />
        <input
          type="number"
          value={upperBound}
          placeholder="price upper bound"
          onChange={handleUpperBoundChange}
        />
        <input type="submit" value="Filter" />
      </form>
      <div>
        {courses.map((el) => {
          return <CourseCard data={el} titleOnly={true} />;
        })}
      </div>
      <h2>{!firstLoad ? `${courses.length} results` : ""}</h2>
    </div>
  );
}

export default InstructorOwnCourses;
