import { CourseCard } from "../../components/CourseCard";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import SelectCountry from "../../components/SelectCountry";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/course/listCourses/details");
      let jsondata = await res.json();
      if (res.ok) {
        setCourses(jsondata);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="course">
      <br></br>
      <SelectCountry/>
      <br></br>
      <div className={CourseStyles["course-list"]}>
        {courses.map((el) => {
          return <CourseCard data={el} />;
        })}
      </div>
    </div>
  );
};

export default Courses;
