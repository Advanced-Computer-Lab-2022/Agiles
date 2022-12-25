import { CourseCard } from "../../components/CourseCard";
import { useState, useEffect } from "react";
import style from "./Courses.module.css";
import Filter from "../../components/Filter";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const chooseMessage = (message) => {
    setMessages(message);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("/course/listCourses/details");
      let jsondata = await res.json();
      if (res.ok) {
        setCourses(jsondata);
        setMessages(jsondata);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={style['wrapper']}>
          <Filter className={style['wrapper-left']} chooseMessage={chooseMessage} currentMessage={messages} courses={courses}/>
          <section className={style["wrapper-right"]}>
            <h1>Courses</h1>
            <h2>courses to get you started</h2>
            <hr></hr>
          <div className={style["course-list"]}>
            {messages.map((el, index) => {
              return <CourseCard  data={el} key={index} />;
            })}
            {messages.length === 0 && (<h5>no courses found</h5>)}
          </div>
          </section>
          </div>
      )}
    </>
  );
};

export default Courses;