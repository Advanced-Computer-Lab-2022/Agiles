import FilterStyles from "./Filter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "react-bootstrap/Accordion";
import { subjectList } from "../pages/Course/subjectList";
import Form from "react-bootstrap/Form";
const cookies = new Cookies();
const Filter = ({ chooseMessage, currentMessage, courses }) => {
  const status = cookies.get("status");
  const [disapled, setDisapled] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState();
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChangePrice1 = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setMinPrice(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setMinPrice(event.target.value);
    }
  };
  const handleChangePrice2 = (event) => {
    if (window.sessionStorage.getItem("factor")) {
      setMaxPrice(
        Math.floor(event.target.value / window.sessionStorage.getItem("factor"))
      );
    } else {
      setMaxPrice(event.target.value);
    }
  };
  const handleChangeRating = async (event) => {
    setValue(event.target.value);
    setRating(event.target.value);
  };
  const handleChangePriceFree = async (event) => {
    if (event.target.checked) {
      setMinPrice(0);
      setMaxPrice(0);
      setDisapled(true);
    } else {
      setMaxPrice(Number.MAX_SAFE_INTEGER);
      setDisapled(false);
    }
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async () => {
    setCount(count + 1);
    if (
      subject == "" &&
      minPrice == null &&
      maxPrice == null &&
      rating == null
    ) {
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
      let newMessage = [];
      currentMessage.forEach((el) => {
        if (
          (subject == "" || el.subject == subject) &&
          (minPrice == null || el.price >= minPrice) &&
          (maxPrice == null || el.price <= maxPrice) &&
          (rating == null || el.rating >= rating)
        ) {
          newMessage.push(el);
        }
      });
      chooseMessage(newMessage);
    }
  };
  const clearFilter = () => {
    chooseMessage(courses);
    setCount(0);
    setValue(0);
  }
  const handleSort = (event) => {
    let newMessage = [];
    const value = event.target.value;
    if (value == 1) {
      courses.forEach((el) => {
        newMessage.push(el);
      });
      newMessage.sort((a, b) => b.studentCount - a.studentCount);
      chooseMessage(newMessage);
    } else if (value == 2) {
      courses.forEach((el) => {
        newMessage.push(el);
      });
      newMessage.sort((a, b) => b.rating - a.rating);
      chooseMessage(newMessage);
    } else if (value == 3) {
      courses.forEach((el) => {
        newMessage.unshift(el);
      });
      newMessage.sort((a, b) => b.id - a.id);
      chooseMessage(newMessage);
    }
  };
  return (
    <div className={FilterStyles["filter"]}>
      <div className={FilterStyles["top"]}>
        <button className={FilterStyles["logo"]} onClick={handleSubmit}>
          <span>
            <FilterListIcon /> Filter
          </span>
        </button>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleSort}
          >
            <MenuItem value={1}>Most popular</MenuItem>
            <MenuItem value={2}>Highest rated</MenuItem>
            <MenuItem value={3}>Newest</MenuItem>
          </Select>
        </FormControl>
      </div>
      <hr />
      <div className="center">
        <Accordion defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Subject</Accordion.Header>
            <Accordion.Body style={{ display: "grid" }}>
              {subjectList.map((subject, index) => (
                <Form.Check
                  name="subject"
                  key={index}
                  type="radio"
                  id={`default-${subject}`}
                  value={subject}
                  onChange={handleChangeSubject}
                  label={subject}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              <Rating
                name="rating"
                value={value}
                onChange={handleChangeRating}
              />
            </Accordion.Body>
          </Accordion.Item>
          {status != 2 && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body style={{ display: "flex" }}>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  disabled={disapled}
                  onChange={handleChangePrice1}
                  className={FilterStyles["inpt"]}
                />
                <Form.Control
                  type="number"
                  placeholder="Max"
                  disabled={disapled}
                  className={FilterStyles["inpt"]}
                  onChange={handleChangePrice2}
                />
                <Form.Check
                  type="checkbox"
                  label="Free"
                  className={FilterStyles["check"]}
                  onClick={handleChangePriceFree}
                />
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
        {count > 0 && (
          <button
            className={FilterStyles["edit"]}
            onClick={clearFilter}
          >
            Clear filters{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;
