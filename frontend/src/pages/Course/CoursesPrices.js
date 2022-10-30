import { CoursePrices } from "../../components/CoursePrices";
import { useState, useEffect } from "react";
import CourseStyles from "./Courses.module.css";
const CoursesPrices = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/course/listCourses/prices");
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
          return <CoursePrices data={el} />;
        })}
      </div>
    </div>
  );
};

export default CoursesPrices;
