import { CourseCard } from "../../components/CourseCard";
import { useState, useEffect } from "react";
import CourseStyles from "./Course.module.css";
import SelectCountry from "../../components/SelectCountry";
import { Link } from "react-router-dom";
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
          return <Link to ="/oneCourse" className="cardLink"><CourseCard data={el} /></Link>;
        })}
      </div>
    </div>
  );
};

export default Courses;
