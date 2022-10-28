import { CourseCard } from "../../components/CourseCard";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import Filter from "../../components/Filter"
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
      <div className={CourseStyles["course-list"]}>
        {courses.map((el) => {
          return <CourseCard data={el} />;
        })}

      </div>
      <Filter />;
    </div>
  );
};

export default Courses;
