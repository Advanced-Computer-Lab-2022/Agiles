import { useLocation} from "react-router-dom";
import { useState,useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CourseStyles from "./Course.module.css";
import { CourseCard } from "../../components/CourseCard";
import axios from "axios";
const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("search");
    const [error , setError] = useState(false);
    const [courses, setCourses] = useState([]);
    const fetchData = useCallback(async()=>{
      const {data} = await axios.get(`/course/listCourses/search?search=${query}`);
      setCourses(data);
    })
  useEffect(() => {
    fetchData();
  },[fetchData]);
        return (<div className="course"> 
          <div className={CourseStyles["course-list"]}>
        {courses.map((el) => {
          return <CourseCard data={el} />
        })}
      </div>
        </div>
     );
}
 
export default SearchResults;