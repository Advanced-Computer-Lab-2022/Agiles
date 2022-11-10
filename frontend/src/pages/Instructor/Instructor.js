import { Link } from "react-router-dom";
import InstructorStyles from "./Instructor.module.css";
function Instructor() {
  return (
    <div>
      <Link to="/instructorOwnCourses">
        <button className={InstructorStyles["button"]}>My Courses</button>
      </Link>
      <Link to="/instructorCreateCourse">
        {" "}
        <button className={InstructorStyles["button"]}>
          create new course
        </button>
      </Link>

      <div></div>
    </div>
  );
}

export default Instructor;
