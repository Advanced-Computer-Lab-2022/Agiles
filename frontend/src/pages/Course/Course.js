import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif"
const Course = () => {
  const [course, setCourse] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const courseId = location.state.id;
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/course/${courseId}`);
      let jsondata = await res.json();
      if (res.ok) {
        setCourse(jsondata);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  
  return (
    <div className="course">
        {isloading ? (
            <LoadingScreen
            loading={true}
            logoSrc={spinner}
            />
            ):(
              <>
            <h2>Title : {course.title}</h2>
            <h3>description : {course.description}</h3>
            <h4>createdBy : {course.instructor}</h4>
            <h5>Rating : {course.rating}</h5>
            <p>price : {course.price}</p>
            </>)
            }
      
    </div>
  );
};

export default Course;
