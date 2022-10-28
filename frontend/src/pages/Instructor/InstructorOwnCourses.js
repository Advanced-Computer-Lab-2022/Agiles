import React, { useState } from "react";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";

function InstructorOwnCourses() {
  const [courses, SetCourses] = useState([]);
  const [name, setName] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
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
        <input type="submit" value="View My Course" />
      </form>
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
      <div>
        {courses.map((el) => {
          return <CourseCard data={el} titleOnly={true} />;
        })}
      </div>
      <div>{!firstLoad ? `${courses.length} results` : ""}</div>
    </div>
  );
}

export default InstructorOwnCourses;
