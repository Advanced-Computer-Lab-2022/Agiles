import React, { useState } from "react";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";
import InstructorOwnCoursesStyles from "./InstructorOwnCourses.module.css";
function InstructorOwnCourses() {
  const [courses, SetCourses] = useState([]);
  const [name, setName] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [subject, setSubject] = useState("");
  const [upperBound, setUpperBound] = useState("");
  const [lowerBound, setLowerBound] = useState("");
  const [free, setFree] = useState(false);

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
    } else if (subject === "" && lowerBound === "" && upperBound === "") {
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
    <div className={InstructorOwnCoursesStyles["component"]}>
      <div className={InstructorOwnCoursesStyles["flex"]}>
        <div>
          <form onSubmit={handleSubmit}>
            <div>Name:</div>
            <input required type="text" value={name} onChange={handleChange} />
            <input type="submit" value="View All Courses" />
          </form>
        </div>
        <div>
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
        </div>
        <div>
          <div>Filter Your Courses by Subject and/or Price</div>
          <form onSubmit={handleFilterSubmit}>
            <div>
              <input
                type="text"
                value={subject}
                placeholder="subject filter"
                onChange={handleSubjectChange}
              />
            </div>
            <div>
              <input
                readOnly={free}
                type="number"
                value={lowerBound}
                placeholder="price lower bound"
                onChange={handleLowerBoundChange}
              />
              <input
                readOnly={free}
                type="number"
                value={upperBound}
                placeholder="price upper bound"
                onChange={handleUpperBoundChange}
              />
              <label>
                <input
                  type="checkbox"
                  checked={free}
                  onClick={(event) => {
                    setFree(event.target.checked);
                    setLowerBound(0);
                    setUpperBound(0);
                  }}
                  className={InstructorOwnCoursesStyles["checkbox"]}
                />
                <span className={InstructorOwnCoursesStyles["span"]}>free</span>
              </label>
            </div>
            <input type="submit" value="Filter" />
          </form>
        </div>
      </div>
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
