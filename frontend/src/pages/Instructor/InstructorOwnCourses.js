import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import InprogressStyles from "../../components/Inprogress.module.css";
import RegCourseCardStyles from "../../components/RegCourseCard.module.css";
import { CourseCard } from "../../components/CourseCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterStyles from "../../components/Filter.module.css";
import Form from "react-bootstrap/Form";
import { subjectList } from "../Course/subjectList";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
const cookies = new Cookies();
const FetchUrl = "/instructor/listCourseTitles";
const Search_URL = "/instructor/searchCourses";
function InstructorOwnCourses() {
  const currentUser = cookies.get("currentUser");
  const [isloading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [current, setCurrent] = useState([]);
  const [disapled, setDisapled] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [subject, setSubject] = useState("");
  const [filerCount, setFilterCount] = useState(0);
  const [upperBound, setUpperBound] = useState(null);
  const [lowerBound, setLowerBound] = useState(null);
  const [free, setFree] = useState(false);
  const handleChangePriceFree = (event) => {
    if (event.target.checked) {
      setLowerBound(0);
      setUpperBound(0);
      setDisapled(true);
    } else {
      setUpperBound(Number.MAX_SAFE_INTEGER);
      setDisapled(false);
    }
  };
  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };
  const handleUpperBoundChange = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setUpperBound(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setUpperBound(event.target.value);
    }
  };

  const handleLowerBoundChange = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setLowerBound(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setLowerBound(event.target.value);
    }
  };
  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (subject == "" && upperBound == null && lowerBound == null) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "please fill at least one field ",
      });
    } else {
      setFilterCount(filerCount + 1);
      let newMessage = [];
      current.forEach((el) => {
        if (
          (subject == "" || el.subject == subject) &&
          (lowerBound == null || el.price >= lowerBound) &&
          (upperBound == null || el.price <= upperBound)
        ) {
          newMessage.push(el);
        }
      });
      setCurrent(newMessage);
    }
  };
  const handleSearch = async (event) => {
      event.preventDefault();
      try {
        const res = await axios.get(Search_URL, {
          params: { search: searchString, instructor: currentUser },
        });
        console.log(res.data);
        setCourses(res.data);
        setCurrent(res.data);
      } catch (e) {
        console.log(e);
      }
  };
  const handleReset = (event) => {
    setFilterCount(0);
    setCurrent(courses);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(FetchUrl + "/" + currentUser);
      setCourses(res.data);
      setCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

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

            <section className={InprogressStyles["courses"]}>
              <div className={InprogressStyles["filter"]}>
                <label style={{ marginBottom: "10px" }}>Filter by</label>
                <div
                  style={{
                    display: "flex",
                    height: "6vh",
                    marginBottom: "20px",
                  }}
                >
                  <Form
                    style={{
                      display: "flex",
                      height: "6vh",
                      marginBottom: "20px",
                    }}
                  >
                    <Select
                      value={subject}
                      label="subject"
                      onChange={handleSubjectChange}
                      style={{ marginRight: "1rem" }}
                    >
                      {subjectList.map((el, index) => {
                        return (
                          <MenuItem value={el} key={index}>
                            {el}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Form.Control
                      type="number"
                      placeholder="Min price"
                      disabled={disapled}
                      onChange={handleLowerBoundChange}
                      className={FilterStyles["inptt"]}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max price"
                      disabled={disapled}
                      className={FilterStyles["inptt"]}
                      onChange={handleUpperBoundChange}
                    />
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "#a00407",
                        border: "none",
                        borderRadius: 0,
                      }}
                      onClick={handleSubmit}
                    >
                      Filter
                    </Button>
                    {filerCount > 0 && (
                    <Button
                      disabled={filerCount == 0}
                      style={{
                        color: "grey",
                        backgroundColor: "inherit",
                        border: "none",
                        fontWeight: "bold",
                      }}
                      onClick={handleReset}
                    >
                      reset
                    </Button>)}
                  </Form>
                  <Form style={{ marginLeft: "auto", display: "flex" }}>
                    <Form.Control
                      type="text"
                      placeholder="search for a course"
                      className={FilterStyles["inpttt"]}
                      onChange={handleSearchChange}
                    />
                    <Button
                      style={{
                        backgroundColor: "#a00407",
                        border: "none",
                        borderRadius: 0,
                      }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </Form>
                </div>
              </div>

              <div className={RegCourseCardStyles["cardgrid"]}>
                {current.length > 0 ? (
                  <>
                    {current.map((el, index) => {
                      return <CourseCard data={el} key={index}></CourseCard>;
                    })}
                  </>
                ) : (
                  <h3>No courses found</h3>
                )}
              </div>
              <div style={{ paddingTop: "50px", display: "flex" }}>
                <button
                  className={InprogressStyles["main-btn"]}
                  onClick={() => (window.location.href = "/createcourse")}
                >
                  Create Course
                </button>
              </div>
            </section>
          </section>
        </div>
      )}
    </>
  );
}

export default InstructorOwnCourses;
