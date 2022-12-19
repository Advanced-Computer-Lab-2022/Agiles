import FilterStyles from "./Filter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Cookies from "universal-cookie";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "react-bootstrap/Accordion";
import { subjectList } from "../pages/Course/subjectList";
import Form from "react-bootstrap/Form";
import { Checkbox } from "@mui/material";
import SetPromotion from "../pages/Admin/adminComponents/SetPromotion";
const cookies = new Cookies();
const Filter = ({ chooseMessage, currentMessage }) => {
  const status = cookies.get("status");
  const [disapled, setDisapled] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState();
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
    chooseMessage(!currentMessage);
    if (
      subject == "" &&
      minPrice == null &&
      maxPrice == null &&
      rating == null
    ) {
      alert("please fill in at least one filter cell");
    } else {
      let url = "";
      if (!(minPrice == null)) {
        url += "lowerBound=" + minPrice + "&";
      } else if (maxPrice != null) {
        setMinPrice(0);
        url += "lowerBound=" + 0 + "&";
      }
      if (!(maxPrice == null)) {
        url += "upperBound=" + maxPrice + "&";
      } else if (minPrice != null) {
        setMaxPrice(Number.MAX_SAFE_INTEGER);
        url += "upperBound=" + Number.MAX_SAFE_INTEGER + "&";
      }
      if (subject != "") {
        url += "subject=" + subject + "&";
      }
      if (rating != null) {
        url += "rating=" + rating + "&";
      }

      navigate({
        pathname: "/courses/filter",
        search: url,
      });
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
      </div>
    </div>
  );
};

export default Filter;
