import FilterStyles from "./Filter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";

const Filter = (props) => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const handleChangePrice1 = (event) => {
    setMinPrice(event.target.value);
  };
  const handleChangePrice2 = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleChangeRating = async (event) => {
      setValue(event.target.value);
      setRating(event.target.value);
  };
  const handleChangePriceFree = async (event) => {
    if (event.target.checked) {
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setMaxPrice(Number.MAX_SAFE_INTEGER);
    }
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = async (event) => {
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
      }
      if (!(maxPrice == null)) {
        url += "upperBound=" + maxPrice + "&";
      }
      if (subject != "") {
        url += "subject=" + subject + "&";
      }
      if (rating != null) {
        url += "rating=" + rating + "&";
      }
      console.log(url);
      if (url != "") {
        navigate({
          pathname: "/courses/filter",
          search: url,
        });
      }
    }
  };
  let priceFilter = (
    <div className={FilterStyles["prices"]}>
      <h3>Price</h3>
      <hr></hr>
      <input
        type="number"
        placeholder="MinPrice"
        value={minPrice}
        onChange={handleChangePrice1}
      />
      <input
        type="number"
        placeholder="MaxPRice"
        value={maxPrice}
        onChange={handleChangePrice2}
      />
      <br></br>
      <label>FREEE</label>
      <input type="checkbox" value={0} onChange={handleChangePriceFree} />
    </div>
  );
  return (
    <div className={FilterStyles["filter"]}>
      <div className={FilterStyles["top"]}>
        <span className={FilterStyles["logo"]}>Filter</span>
      </div>
      <hr />
        <div className="center">
          <form onSubmit={handleSubmit}>
            <div className="panel">
              <h3>Subject</h3>
              <hr></hr>
              <label> Enter Subject</label>
              <input
                type="text"
                value={subject}
                onChange={handleChangeSubject}
              />
            </div>
            <div className={FilterStyles["rating"]}>
              <h3>Rating</h3>
              <hr></hr>
              <Rating
                name="rating"
                value={value}
                onChange={handleChangeRating}
              />
            </div>
            {props.corporate ? "" : priceFilter}
            <button type="submit">Filter</button>
          </form>
        </div>
    </div>
  );
};

export default Filter;
