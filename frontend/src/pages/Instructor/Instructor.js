import { Link } from "react-router-dom";

function Instructor() {
  return (
    <div>
      <Link to="/instructorOwnCourses">
       <button>view my course titles</button>
      </Link>
      <Link to="/instructorCreateCourse">
        {" "}
        <button>create new course</button>
      </Link>

      <div></div>
    </div>
  );
}

export default Instructor;
