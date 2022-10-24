import React from 'react'
import CorporateTraineeStyles from './CorporateTrainee.module.css'
import { Link } from "react-router-dom";
function CorporateTrainee() {
  return (
    <div className={CorporateTraineeStyles["button-list"]}>
      <Link to="/selectCountry">
        <button>select country</button>
      </Link>
      <Link to="/ViewCourseTitles">
        {" "}
        <button>
          view all the titles of the courses available including the total hours
          of the course and course rating
        </button>
      </Link>
      
      <Link to="/filter1">
        <button>filter the courses based on a subject and/or rating</button>
      </Link>
      
      <Link to="/search">
        <button>
          search for a course based on course title or subject or instructor
        </button>
      </Link>
      
      </div>
  )
}

export default CorporateTrainee