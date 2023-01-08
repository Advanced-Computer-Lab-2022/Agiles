import style from "./Explore.module.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif";
import { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
const fetchURL = "course/most/popular";
const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const res = await axios.get(fetchURL);
    setCourses(res.data);
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
        <section className={style["Explore"]}>
          <h1>Popular Courses</h1>
          <div className={style['ineer']}>
          <Carousel className={style['carousel']}>
            <Carousel.Item className={style['item']}>
            <div className={style["course-list"]}>
              {courses
                .filter((course, idx) => idx <= 4)
                .map((el, index) => {
                  return <CourseCard data={el} key={index} />;
                })}
                </div>
            </Carousel.Item  >
            <Carousel.Item className={style['item']}>
            <div className={style["course-list"]}>
              {courses
                .filter((course, idx) => idx >4)
                .map((el, index) => {
                  return <CourseCard data={el} key={index} />;
                })}
                </div>
            </Carousel.Item>
          </Carousel>
          </div>
        </section>
      )}
    </>
  );
};

export default Explore;
