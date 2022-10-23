import { CourseCard } from "../components/CourseCard";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
const Course = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/course/listCourses/details");
      let jsondata = await res.json();
      if (res.ok) {
        setCourses(jsondata);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="course">
      <div className={CourseStyles["course-list"]}>
        {courses.map((el) => {
          return <CourseCard data={el} />;
        })}
      </div>
    </div>
  );
};

export default Course;
