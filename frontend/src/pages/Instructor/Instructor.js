import React, { useState } from "react";
import { Link } from "react-router-dom";

function Instructor() {
  return (
    <div>
      <Link to="/instructorOwnCourses">
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

      <div></div>

      {/* <Link to="/courses">
            <button className="guestButtons">view all courses</button>
            </Link>

            <Link to="/coursesPrices">
            <button className="guestButtons">View the price of each course</button>
            </Link>

            <Link to="/searchCourses">
                <button className="guestButtons">Search for courses given by yourself</button>
            </Link>

            <Link to="/searchCourses">
                <button className="guestButtons">Search for courses given by yourself</button>
            </Link>

            <Link to="/listCourseTitles">
                <button className="guestButtons">List all courses given by yourself</button>
            </Link>

            <Link to="/listCourseTitles">
                <button className="guestButtons">List all courses given by yourself</button>
            </Link>

            <Link to="/addCourse">
                <button className="guestButtons">Offer Course</button>
            </Link>

            <Link to="/addCourse">
                <button className="guestButtons">Offer Course</button>
            </Link>

            <Link to="/filterCourses">
                <button className="guestButtons">Filter Courses given by yourself</button>
            </Link>

            <Link to="/listCourses/search">
                <button className="guestButtons">Search for courses</button>
            </Link>

            <Link to="/listCourses/filter">
                <button className="guestButtons">Filter all courses</button>
            </Link> */}
    </div>
  );
}

export default Instructor;
