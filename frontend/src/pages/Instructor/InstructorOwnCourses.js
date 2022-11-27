import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import InprogressStyles from "../../components/Inprogress.module.css";
import InstructorOwnCoursesStyles from "./InstructorOwnCourses.module.css";
import RegCourseCardStyles from "../../components/RegCourseCard.module.css";
import RegCourseInst from "../../components/RegCourseInst";
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
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  
  }

  const fetchData = async()=>{
    setIsLoading(true);
    try {
      const res = await axios.get(FetchUrl + "/" + currentUser);
      setCourses(res.data)
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    fetchData();
  },[]);
  /*const handleFilterSubmit = async (event) => {
    event.preventDefault();
    let lb = lowerBound;
    let ub = upperBound;
    if (free) {
      lb = "0";
      ub = "0";
    }
    if (name == "") {
      alert("please enter your name");
      return;
    } else if (subject == "" && lb == "" && ub == "") {
      alert("please fill in at least one filter cell");
      return;
    } else {
      setFirstLoad(false);

      let url = "/instructor/filterCourses/?";
      if (!(lb == "")) {
        if (window.sessionStorage.getItem("factor")) {
          lb = Math.floor(lb / window.sessionStorage.getItem("factor"));
        }

        url += "lowerBound=" + lb + "&";
      }
      if (!(ub == "")) {
        if (window.sessionStorage.getItem("factor")) {
          ub = Math.floor(ub / window.sessionStorage.getItem("factor"));
        }
        url += "upperBound=" + ub + "&";
      }
      if (subject != "") {
        url += "subject=" + subject + "&";
      }

      url += `username=${name}`;
      console.log(url);
      let data = await axios.get(url);
      SetCourses(data.data);
    }
  };*/

  return (
    <>
    {isloading ? (
      <LoadingScreen loading={true} logoSrc={spinner} />
    ) : (
    <div className={InprogressStyles["Wrapper"]}>
      <h2 className={InprogressStyles["Wrapper_h2"]}>My Courses</h2>
      <div className={InstructorOwnCoursesStyles["Wrapper-top"]}>
        <div>
          <label>Filter by</label>
         
          <form >
          <div className={InstructorOwnCoursesStyles["Wrapper-filter"]}>
            <div>
              <input
                type="text"
                value={subject}
                placeholder="subject filter"
                onChange={handleSubjectChange}
              />
            </div>
            <div>
              <input
                readOnly={free}
                type="number"
                value={lowerBound}
                placeholder="price lower bound"
                onChange={handleLowerBoundChange}
              />
              <input
                readOnly={free}
                type="number"
                value={upperBound}
                placeholder="price upper bound"
                onChange={handleUpperBoundChange}
              />
              <label>
                <input
                  type="checkbox"
                  checked={free}
                  onChange={(event) => {
                    console.log("checked: " + event.target.checked);
                    console.log("free: " + free);
                    setFree(event.target.checked);
                    setLowerBound(0);
                    setUpperBound(0);
                  }}
                  className={InstructorOwnCoursesStyles["checkbox"]}
                />
                <span className={InstructorOwnCoursesStyles["span"]}>free</span>
              </label>
            </div>
            </div>
            <input type="submit" value="Filter" />
          </form>
        
        </div>
        <div>
          <form onSubmit={handleSearch} className={InstructorOwnCoursesStyles['search-bar']}>
           <div className={InstructorOwnCoursesStyles['searchIcon']}><BsSearch></BsSearch></div>
            <input
              required
              type="text"
              className={InstructorOwnCoursesStyles["inpt"]}
              value={searchString}
              placeholder="Search my courses"
              onChange={handleSearchChange}
            />
          </form>
          </div>
      </div>
      <div>
      <div className={RegCourseCardStyles["cardgrid"]}>
        {courses.length>0 ?(<>{courses.map((el,index) => {
          return <RegCourseInst data={el} key={index}></RegCourseInst>;
        })}</>):<h3>No courses found</h3>}
        </div>
      </div>

    </div>)}</>
  );
}

export default InstructorOwnCourses;
