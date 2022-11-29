import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Courses.module.css";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import Filter from "../../components/Filter";
const FilterResults = (props) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);
  const chooseMessage = (message) => {
    setMessage(message);
  };
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [loading, setIsLoading] = useState(false);
  const handleClear = () => {
    navigate("/courses");
  };
  const fetchData = async () => {
    setIsLoading(true);
    let url = "/course/listCourses/filter" + location.search;
    let res = await axios.get(url);
    setCourses(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [message]);

  return (
    <div className={style["course"]}>
      {loading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={style["wrapper"]}>
          <Filter
            className={style["wrapper-left"]}
            chooseMessage={chooseMessage}
            currentMessage={message}
          />
          <section className={style["wrapper-right"]}>
            <h1>Filtered Courses</h1>
            <h2>
              {courses.length} filter results{" "}
              <button className={style["edit"]} onClick={handleClear}>
                clear filters
              </button>
            </h2>

            <hr></hr>
            {courses.length > 0 && (
              <div className={style["course-list"]}>
                {courses.map((el, index) => {
                  return <CourseCard data={el} key={index} />;
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
export default FilterResults;
