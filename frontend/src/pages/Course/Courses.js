import { CourseCard } from "../../components/CourseCard";
import { useState, useEffect, useRef } from "react";
import style from "./Courses.module.css";
import Filter from "../../components/Filter";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import { Checkbox } from "@mui/material";
import CoursePromo from "../Instructor/CoursePromo";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
const Courses = (props) => {
  const PROMO_URL = "/course/addPromotionMulti";

  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [promotion, setPromotion] = useState();
  const [enddate, setEnddate] = useState("");
  const [alert, setAlert] = useState("");
  const [flag, setFlag] = useState(false);
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        idArr: IDsArr,
        promo: promotion,
        enddate: enddate,
      };
      const res = await axios.patch(PROMO_URL, data);
      setAlert("success");
      setFlag(true);
    } catch (e) {
      setAlert("danger");
      setFlag(false);
    }
    setPromotion("amount..");
    setEnddate("");
  };
  const chooseMessage = (message) => {
    setMessage(message);
  };

  let IDsArr = [];
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };
  const itemEls = useRef(new Array());

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch("/course/listCourses/details");
      let jsondata = await res.json();
      if (res.ok) {
        setCourses(jsondata);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [selectAll]);
  const list = useRef();
  let promoForm = (
    <form
      onSubmit={handleSubmit}
      style={{
        // display: "grid",
        maxWidth: "50%",
        gap: "2rem",
        marginTop: "20rem",
      }}
    >
      <div>
        {flag && (
          <Alert key={alert} variant={alert}>
            {alert == "success"
              ? "promotion updated successfully"
              : "error happened"}
          </Alert>
        )}
        <span>Amount (%) </span>
        <input
          required
          type="number"
          value={promotion}
          placeholder="amount.."
          style={{
            border: "0.5px solid black",
            borderRadius: "0.25rem",
            marginLeft: "0.5rem",
            padding: "0.5rem",
            width: "10rem",
          }}
          onChange={handlePromo}
        />
      </div>
      <div>
        <span>End Date </span>
        <input
          required
          type="date"
          value={enddate}
          style={{
            border: "0.5px solid black",
            borderRadius: "0.25rem",
            marginLeft: "1.7rem",
            padding: "0.5rem",
            width: "10rem",
          }}
          onChange={handleEnddate}
        ></input>
      </div>
      <Button
        variant="dark"
        type="submit"
        style={{
          backgroundColor: "#a00407",
          borderRadius: 0,
          width: "10rem",
          border: "none",
        }}
      >
        Submit
      </Button>
    </form>
  );
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <div className={style["wrapper"]}>
          {!props.admin ? (
            <Filter
              className={style["wrapper-left"]}
              chooseMessage={chooseMessage}
              currentMessage={message}
              admin={props.admin}
              selectAll={props.selectAll}
            />
          ) : (
            promoForm
            // <Filter

            //   chooseMessage={chooseMessage}
            //   currentMessage={message}
            //   admin={props.admin}
            //   selectAll={props.selectAll}
            // />
          )}
          <section className={style["wrapper-right"]}>
            <h1>Courses</h1>
            <h2>
              {props.admin
                ? "select courses you want to set Promotion"
                : "courses to get you started"}
            </h2>
            <div className={style["selectall"]}>
              {" "}
              Select All :{" "}
              <Checkbox
                defaultChecked={selectAll}
                onClick={handleSelectAll}
              ></Checkbox>
            </div>

            <hr></hr>
            <div className={style["course-list"]} ref={list}>
              {courses.map((el, index) => {
                if (selectAll && el._id) IDsArr.push(el._id);
                return (
                  <div>
                    <CourseCard
                      checked={selectAll}
                      data={el}
                      key={el._id}
                      admin={true}
                      ref={(el) => itemEls.current.push(el)}
                    />
                    <Checkbox
                      defaultChecked={selectAll}
                      onChange={(event) => {
                        if (event.target.checked) {
                          IDsArr.push(el._id);
                        } else {
                          const index = IDsArr.indexOf(el._id);
                          if (index > -1) {
                            // only splice array when item is found
                            IDsArr.splice(index, 1); // 2nd parameter means remove one item only
                          }
                        }

                        console.log(IDsArr);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div></div>
          </section>
        </div>
      )}
    </>
  );
};

export default Courses;
