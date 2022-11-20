import React, { useState } from "react";

function RegisteredCourses() {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const id = 1;
  const fetchData = async () => {
    const res = await fetch(
      `/individualtrainee/getIndividualTraineebyId/${id}`
    );
    let jsondata = await res.json();
    registeredCoursesData = jsondata.registered_courses.map(async (el) => {
      const course = await fetch(`/courses/${el.id}`);
      const coursejson = await course.json();
      return coursejson;
    });
    setRegisteredCourses(registeredCoursesData);
  };
  fetchData();
  return (
    <div>
      {registeredCourses.map((el) => {
        return <CourseCard data={el}></CourseCard>;
      })}
    </div>
  );
}

export default RegisteredCourses;
