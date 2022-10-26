import React from "react";
import { Link } from "react-router-dom";

function Instructor() {
  return (
    <div>
      <Link to="/selectCountry">
        <button>select country</button>
      </Link>
      <Link to="/selectCountry">
        {" "}
        {/* page not created yet */}
        <button>view course titles ,rating , hours</button>
      </Link>
      <Link to="/coursesPrices">
        {" "}
        <button>view price of each course</button>
      </Link>
      <Link to="/viewCoursesPrices">
        {/* not created yet */}
        <button>normal filter by subject , rating</button>
      </Link>
      <Link>
        {" "}
        {/* not created yet */}
        <button>normal filter by price</button>
      </Link>
      <Link>
        <button>normal search</button>
      </Link>
      <Link>
        {/* not created yet */} <button>view course</button>
      </Link>
      <Link>
        {/* not created yet */} <button>view my course titles</button>
      </Link>
      <Link>
        {/* not created yet */} <button>specific filter </button>
      </Link>
      <Link>
        {" "}
        {/* not created yet */}
        <button>specific search</button>
      </Link>
      <Link to="/instructorCreateCourse">
        {" "}
        <button>create new course</button>
      </Link>
    </div>
  );
}

export default Instructor;
