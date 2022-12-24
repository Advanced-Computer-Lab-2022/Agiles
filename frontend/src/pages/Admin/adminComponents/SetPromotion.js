import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import NavbarStyles from "./SearchStyles.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";

import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import spinner from "../../../static/download.gif";
import LoadingScreen from "react-loading-screen";
import AdminFilter from "./AdminFilter";
import Alert from "react-bootstrap/Alert";

function SetPromotion(props) {
  const [courses, setCourses] = useState([]);
  const [change, setChange] = useState(true);
  const [action, setAction] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [promotion, setPromotion] = useState();
  const [enddate, setEnddate] = useState("");
  const [alert, setAlert] = useState("");
  const [flag, setFlag] = useState(false);
  const PROMO_URL = "/course/addPromotionMulti";
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const [IDsArr, setIDsArr] = useState([]);
  const addOrRemove = async (name) => {
    const newIDsArr = [...IDsArr];
    const index = newIDsArr.indexOf(name);
    if (index === -1) {
      newIDsArr.push(name);
    } else {
      newIDsArr.splice(index, 1);
    }
    setIDsArr(newIDsArr);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setAction(1);
    setChange(!change);
  };
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e, IDsArr) => {
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
      setChange(!change);
    } catch (e) {
      setAlert("danger");
      setFlag(false);
    }
    setPromotion("amount..");
    setEnddate("");
  };

  const handleChildCheck = (event) => {
    let newc = courses;
    newc.forEach((course) => {
      if (course._id === event.target.value) {
        course.checked = event.target.checked;
      }
    });
    setCourses(newc);
  };
  const handleSelectAll = (event) => {
    console.log(event.target.checked);
    let newc = courses;
    newc.forEach((course) => {
      if (event.target.checked) course.checked = true;
      else course.checked = false;
    });
    setCourses(newc);
    setAction(-1);
    setChange(!change);
    // if (event.target.checked) setSelectAll(true);
    // else setSelectAll(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    let url;
    if (action == 0) {
      url = `/course/listCourses/details`;
    } else if (action == 1) {
      url = `/course/listCourses/search?search=${searchString}`;
    } else if (action == 2) {
      url = "/course/listCourses/filter" + location.search;
    }
    let { data } = await axios.get(url);
    setCourses(data.map((obj) => ({ ...obj, checked: false })));

    setIsLoading(false);
  };
  useEffect(() => {
    if (action > -1) {
      fetchData();
    }
  }, [change]);
  // useEffect(() => {
  //   let newCourses = courses;
  //   if (selectAll) {
  //     newCourses.forEach((course) => (course.checked = true));
  //     setIDsArr(
  //       courses.map((el) => {
  //         return el._id;
  //       })
  //     );
  //   } else {
  //     newCourses.forEach((course) => (course.checked = false));
  //     setIDsArr([]);
  //   }
  //   setCourses(newCourses);
  // }, [selectAll]);
  if (isloading) return <LoadingScreen loading={true} logoSrc={spinner} />;
  return (
    <div className={NavbarStyles["promo-container"]}>
      <div className={NavbarStyles["misc"]}>
        <div>
          <h5>Search Courses</h5>
          <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
            <BsSearch
              className={NavbarStyles["search-icon"]}
              onClick={handleSearch}
            />
            <input
              className={NavbarStyles["inpt"]}
              placeholder="search for a course"
              value={searchString}
              required
              onChange={(event) => setSearchString(event.target.value)}
            ></input>
          </form>
        </div>
        <div>
          <h5>Filter Courses</h5>
          <div>
            <AdminFilter
              changeState={{ change, setChange }}
              actionState={{ action, setAction }}
            />
          </div>
        </div>
        <div className={NavbarStyles["setPromotion"]}>
          <form onSubmit={(e) => handleSubmit(e, IDsArr)}>
            <h5>Set Promotion</h5>
            <div>
              {flag && (
                <Alert key={alert} variant={alert}>
                  {alert == "success"
                    ? "promotion updated successfully"
                    : "error happened"}
                </Alert>
              )}
              <div>Amount (%) </div>
              <input
                required
                type="number"
                value={promotion}
                placeholder="amount.."
                min="0"
                max="100"
                style={{
                  border: "0.5px solid black",
                  borderRadius: "0.25rem",
                  padding: "0.5rem",
                  width: "10rem",
                  margin: "1rem 0",
                }}
                onChange={handlePromo}
              />
            </div>
            <div>
              <div>End Date </div>
              <input
                required
                type="date"
                value={enddate}
                style={{
                  border: "0.5px solid black",
                  borderRadius: "0.25rem",
                  margin: "1rem 0",
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
        </div>
      </div>
      <div
        style={{
          border: "1px solid rgba(230, 230, 230)",
          borderRadius: "25px",
          width: "100%",
          margin: "100px 20px 20px 0 ",
          display: "flex",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ verticalAlign: "text-top" }}>
              <TableCell
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Course Title
              </TableCell>
              <TableCell
                // align="middle"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Instructor Name
              </TableCell>
              <TableCell
                // align="middle"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Current Price ($)
              </TableCell>
              <TableCell
                // align="middle"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Current Discount (%)
              </TableCell>
              <TableCell
                // align="middle"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                discount enddate
              </TableCell>
              <TableCell
                // align="middle"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                select{" "}
                <Checkbox
                  defaultChecked={selectAll}
                  onChange={handleSelectAll}
                ></Checkbox>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "none" }}>
            {courses.map((el) => {
              return (
                <TableRow
                  style={{
                    border: "none",
                    verticalAlign: "text-top",
                    lineHeight: "100px",
                  }}
                >
                  <TableCell>{el.title}</TableCell>
                  <TableCell>{el.instructorname}</TableCell>
                  <TableCell>{el.price}</TableCell>
                  <TableCell>{el.discount}</TableCell>
                  <TableCell>
                    {new Date(el.discount_enddate).toDateString() +
                      " " +
                      new Date(el.discount_enddate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={el.checked}
                      value={el._id}
                      onChange={handleChildCheck}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SetPromotion;
