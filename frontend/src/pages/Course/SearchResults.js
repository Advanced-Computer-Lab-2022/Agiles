import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseStyles from "./Courses.module.css";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Filter from "../../components/Filter";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");
  const [error, setError] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `/course/listCourses/search?search=${query}`
    );
    if (data.length === 0) {
      setError(true);
    } else {
      setCourses(data);
      setError(false);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [query]);

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
              
              <div className={CourseStyles["course-list"]}>
                {courses.map((el) => {
                  return <CourseCard data={el} />;
                })}
              </div>
              <Filter />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
