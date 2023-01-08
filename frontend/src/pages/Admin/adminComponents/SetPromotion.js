import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import NavbarStyles from "./SearchStyles.module.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MyCheckbox from "./MyCheckbox";
import Pagination from '@mui/material/Pagination';
import {
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
import { textAlign, width } from "@mui/system";

function SetPromotion(props) {
  const [currentIndex,setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState([]);
  const [change, setChange] = useState(true);
  const [action, setAction] = useState(0);
  const [isloading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [promotion, setPromotion] = useState();
  const [enddate, setEnddate] = useState("");
  const [alert, setAlert] = useState("");
  const [flag, setFlag] = useState(false);
  const PROMO_URL = "/course/addPromotionMulti";
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const changeMessage = (message) => {
    setMessages(message);
  };
  const query = new URLSearchParams(location.search);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [IDsArr, setIDsArr] = useState([]);
  const [submit, setSubmit] = useState(false);
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
  const handlePagination = (event,value)=>{
    setCurrentIndex((value-1)*6);
  }
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e, IDsArr) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const data = {
        idArr: isCheck,
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

  const fetchData = async () => {
    if (!submit) setIsLoading(true);
    let url;
    if (action == 0) {
      url = `/course/listCourses/details`;
    } else if (action == 1) {
      url = `/course/listCourses/search?search=${searchString}`;
      setIsCheck([]);
      setIsCheckAll(false);
    }
    let { data } = await axios.get(url);
    setCourses(data.map((obj) => ({ ...obj, checked: false })));
    setMessages(data.map((obj) => ({ ...obj, checked: false })));
    setIsLoading(false);
  };
  useEffect(() => {
    if (action > -1) {
      fetchData();
    }
  }, [change]);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(courses.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  if (isloading) return <LoadingScreen loading={true} logoSrc={spinner} />;
  return (
    <div className={NavbarStyles["promo-container"]}>
      <div className={NavbarStyles["misc"]}>
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
        <div>
          <div>
            <AdminFilter
              changeMessage={changeMessage}
              courses={courses}
              currentMessage={messages}
              setIsCheck={setIsCheck}
              setIsCheckAll={setIsCheckAll}
            />
          </div>
        </div>
        <div className={NavbarStyles["setPromotion"]}>
          <form onSubmit={(e) => handleSubmit(e, IDsArr)}>
            <h5 style={{ fontWeight: "bold" }}>Set Promotion</h5>
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
                  width: "20rem",
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
                  width: "20rem",
                }}
                onChange={handleEnddate}
              ></input>
            </div>
            <div style={{ width: "50%", margin: "auto" }}>
              <Button
                // variant="dark"
                type="submit"
                style={{
                  borderRadius: 0,
                  width: "10rem",
                  border: "none",
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div style={{maxWidth:"95%",margin:"auto" }} >
      <div className={NavbarStyles["divaya2"]}>
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
                <MyCheckbox
                  type="Checkbox"
                  name="selectAll"
                  id="selectAll"
                  handleClick={handleSelectAll}
                  isChecked={isCheckAll}
                ></MyCheckbox>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "none" }}>
            {messages.map((el,index) => {
              if (index>=currentIndex&&index<currentIndex+6) {
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
                    {el.discount == 0
                      ? "-"
                      : new Date(el.discount_enddate).toDateString() +
                        " " +
                        new Date(el.discount_enddate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <MyCheckbox
                      key={el._id}
                      type="Checkbox"
                      id={el._id}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(el._id)}
                    />
                  </TableCell>
                </TableRow>
              )};
            })}
          </TableBody>  
         
          


        </Table>
      </div>
          <div style={{margin:"auto",display:"flex" ,justifyContent:"center"}}>
          <Pagination count={Math.ceil(messages.length/6)}  color="primary"  onChange={handlePagination} />
          </div>
      </div>
      </div>
  );
}

export default SetPromotion;
