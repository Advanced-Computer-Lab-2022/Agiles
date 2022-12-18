import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import InprogressStyles from "../../components/Inprogress.module.css";
import RegCourseCardStyles from "../../components/RegCourseCard.module.css";
import { CourseCard } from "../../components/CourseCard";
const cookies = new Cookies();
const FetchUrl = '/instructor/listCourseTitles';
const Search_URL = '/instructor/searchCourses'
function InstructorOwnCourses() {
  const currentUser = cookies.get('currentUser');
  const [isloading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [subject, setSubject] = useState("");
  const [upperBound, setUpperBound] = useState("0");
  const [lowerBound, setLowerBound] = useState("0");
  const [free, setFree] = useState(false);
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleUpperBoundChange = (event) => {
    setUpperBound(event.target.value);
  };

  const handleLowerBoundChange = (event) => {
    setLowerBound(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleSearch = async(event)=>{
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.get(Search_URL ,{ params: { search:searchString , instructor :currentUser }});
      setCourses(res.data)
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  
  }

  const fetchData = async()=>{
    setIsLoading(true);
    try {
      const res = await axios.get(FetchUrl + "/" + currentUser);
      setCourses(res.data)
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    fetchData();
  },[]);

  return (
    <>
    {isloading ? (
      <LoadingScreen loading={true} logoSrc={spinner} />
    ) : (
      <div>
        
    <section className={InprogressStyles["Wrapper"]}>
           <section className={InprogressStyles["main-section"]}>
              <h1>My Courses</h1>          
           </section>
       
      <section className={InprogressStyles['courses']}>
      <button  className={InprogressStyles['main-btn']} onClick={()=>window.location.href="/createcourse"}>Create Course</button>
      <div className={RegCourseCardStyles["cardgrid"]}>
        {courses.length>0 ?(<>{courses.map((el,index) => {
          return <CourseCard data={el} key={index}></CourseCard>;
        })}</>):<h3>No courses found</h3>}
        </div>
        </section>
    </section>
    </div>)}</>
  );
}

export default InstructorOwnCourses;
