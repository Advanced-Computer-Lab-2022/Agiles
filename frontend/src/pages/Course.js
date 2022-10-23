import { CourseCard } from "../components/CourseCard";
import { useState } from "react";
const Course = () => {
  const [courses, setCourses] = useState([]);
  const handleClick = async () => {
    console.log("run");
    const res = await fetch("api/course/listCourses/details");
    setCourses(await res.json());
  };
  return (
    <div className="course">
      <h1>Hello to Course page</h1>
      <CourseCard />
      <div>
        {courses.map((el) => {
          return <p>{el.title}</p>;
        })}
      </div>
      <button onClick={handleClick}> Click</button>
    </div>
  );
};

export default Course;
