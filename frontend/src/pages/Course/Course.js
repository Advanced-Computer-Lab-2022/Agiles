import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const Course = () => {
  const [course, setCourse] = useState([]);
  const [loaded, isLoaded] = useState(false);
  const location = useLocation();
  const courseId = location.state.id;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/course/${courseId}`);
      let jsondata = await res.json();
      if (res.ok) {
        setCourse(jsondata);
        isLoaded(true);
      }
    };
    fetchData();
  }, []);
  if (loaded){
  return (
    <div className="course">
        <div>
      <h2>Title : {course.title}</h2>
      <h3>description : {course.description}</h3>
      <h4>createdBy : {course.instructor}</h4>
      <h5>Rating : {course.rating}</h5>
      <p>price : {course.price}</p>
      </div>
    </div>
  );
  }
  else{
    return (<div>Loading</div>)
  }
};

export default Course;
