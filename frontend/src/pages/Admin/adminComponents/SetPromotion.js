import React, { useState, useEffect } from "react";
import Courses from "../../Course/Courses";
import { BsSearch } from "react-icons/bs";
import NavbarStyles from "./SearchStyles.module.css";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
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
import spinner from "/Users/abdullahahmad/Agiles/frontend/src/static/download.gif";
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
  let IDsArr = [];
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(searchString);
    setAction(1);
    setChange(!change);
  };
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (action == 0) {
        const { data } = await axios.get(`/course/listCourses/details`);
        setCourses(data);
      }
      if (action == 1) {
        const { data } = await axios.get(
          `/course/listCourses/search?search=${searchString}`
        );
        setCourses(data);
      }
      if (props.filter) {
        let url = "/course/listCourses/filter" + location.search;
        let res = await axios.get(url);
        setCourses(res.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [alert, change]);

  if (isloading) return <LoadingScreen loading={true} logoSrc={spinner} />;
  return (
    <div>
      <form onSubmit={handleSearch} className={NavbarStyles["search-bar"]}>
        <BsSearch
          className={NavbarStyles["search-icon"]}
          onClick={handleSearch}
        />
        <input
          className={NavbarStyles["inpt"]}
          placeholder="search for anything"
          value={searchString}
          required
          onChange={(event) => setSearchString(event.target.value)}
        ></input>
      </form>
      <div>
        <AdminFilter
          changeState={{ change, setChange }}
          actionState={{ action, setAction }}
        />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Title</TableCell>
            <TableCell align="middle">Instructor Name</TableCell>
            <TableCell align="middle">Current Price ($)</TableCell>
            <TableCell align="middle">Current Discount (if any)</TableCell>
            <TableCell align="middle">discount enddate</TableCell>
            <TableCell align="middle">
              select{" "}
              <Checkbox
                defaultChecked={selectAll}
                onChange={(event) => {
                  setSelectAll(event.target.checked);
                  setChange(!change);
                }}
              ></Checkbox>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((el) => {
            if (selectAll) IDsArr.push(el._id);

            return (
              <TableRow>
                <TableCell>{el.title}</TableCell>
                <TableCell>{el.instructorname}</TableCell>
                <TableCell>{el.price}</TableCell>
                <TableCell>{el.discount}</TableCell>
                <TableCell>{el.discount_enddate}</TableCell>
                <TableCell>
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
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
    </div>
  );
}

export default SetPromotion;
