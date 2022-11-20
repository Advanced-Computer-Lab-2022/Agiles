import { Link } from "react-router-dom";
import InstructorStyles from "./Instructor.module.css";
// 635fba2f99f3f855c075eb6d
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
      <Link to="/instructor/instructorViewProfile">
        <button className={InstructorStyles["button"]}>
          View/Edit Profile
        </button>
      </Link>

      <div></div>
    </div>
  );
}

export default Instructor;
