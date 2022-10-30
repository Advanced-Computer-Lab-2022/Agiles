import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseStyles from "./Courses.module.css";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";


const FilterResults =  () => {
  const location = useLocation();
  console.log(location.search);
  const query = new URLSearchParams(location.search);

  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    let url = "/course/listCourses/filter" + location.search
    console.log(url)
  let res = await axios.get("/course/listCourses/filter" + location.search);
  console.log({res})
  if(!res){
    setError(true);
  }
  else{
    setCourses(res.data);
    setError(false);
  }
  setIsLoading(false);
}
  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <div className="course">
      {loading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <>
          {error ? (
            <h1>No matches</h1>
          ) : (
            <>
              {" "}
              (
              <div className={CourseStyles["course-list"]}>
                {courses.map((el) => {
                  return <CourseCard data={el} />;
                })}
              </div>
              )
            </>
          )}
        </>
      )}
    </div>
  );
};
export default FilterResults;
