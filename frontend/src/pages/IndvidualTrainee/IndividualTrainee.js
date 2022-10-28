import React from "react";
import { Link } from "react-router-dom";
import IndividualTraineeStyles from "./IndividualTrainee.module.css";
function IndividualTrainee() {
  return (
    <div className={IndividualTraineeStyles["button-list"]}>
      <Link to="/ViewCourseTitles">
        {" "}
        <button>
          view all the titles of the courses available including the total hours
          of the course and course rating
        </button>
      </Link>
      <Link to="/ViewCoursePrice">
        <button>view the price of each course</button>
      </Link>
      <Link to="/filter1">
        <button>filter the courses based on a subject and/or rating</button>
      </Link>
      <Link to="/filter2">
        <button>filter the courses based on price (price can be FREE)</button>
      </Link>
      <Link to="/search">
        <button>
          search for a course based on course title or subject or instructor
        </button>
      </Link>
      <Link to="/viewCourse">
        <button>
          choose a course from the results and view (but not open) its details
          including course subtitles, excercises , total hours of each subtitle,
          total hours of the course and price (including % discount if
          applicable) according to the country selected
        </button>
      </Link>
    </div>
  );
}

export default IndividualTrainee;
