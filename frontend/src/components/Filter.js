import "./Filter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Filter = () => {
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(5);
  let query = "";
  const handleSubmitSubject = async (event) => {
    event.preventDefault();


    if (query == "") query = query + `subject=${subject}`;
    else query = query + `&subject=${subject}`;
    let res = await axios.get(`course/listCourses/filter/?` + query);
    navigate({
      pathname: "/courses/filter",
      search: query,
    });

    // setSubject("");
    // console.log("empty subject");
    // query.replace(`?subject=${subject}`, "");
    // query.replace(`subject=${subject}`, "");
    // res = await axios.get(`course/listCourses/filter/?` + query);
    // console.log(res.data);
    // navigate({
    //   pathname: "/courses/filter",
    //   search: query,
    // });
  };
  const handleChangePrice1 = (event) => {
    setMinPrice(event.target.value);
  };
  const handleChangePrice2 = (event) => {
    setMaxPrice(event.target.value);
  };
  const handleChangeRating = async (event) => {
    if (event.target.checked) {
      setRating(event.target.value);
      if (query == "") query = query + `rating=${rating}`;
      else query = query + `&rating=${rating}`;
      navigate({
        pathname: "/courses/filter",
        search: query,
        state: {rating: rating}
      });
    } else {
      setRating(5);
      query.replace(`?rating=${rating}`, `rating=${5}`);
      query.replace(`rating=${rating}`, `rating=${5}`);
      let res = await axios.get(`course/listCourses/filter/?` + query);
    }
  };
  const navigate = useNavigate();
  const handlePrice = async (event) => {
    event.preventDefault();
    if (query == "")
      query = query + `lowerBound=${minPrice}&upperBound=${maxPrice}`;
    else query = query + `&lowerBound=${minPrice}&upperBound=${maxPrice}`;
    let res = await axios.get(`course/listCourses/filter/?` + query);
    navigate({
      pathname: "/courses/filter",
      search: query,
      state: {lowerBound: minPrice, upperBound: maxPrice}
    });
  };

  const handleChangePriceFree = async (event) => {
    if (event.target.checked) {
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setMaxPrice(Number.MAX_SAFE_INTEGER);
    }
    event.preventDefault();
    if (query == "")
      query = query + `lowerBound=${minPrice}&upperBound=${maxPrice}`;
    else query = query + `&lowerBound=${minPrice}&upperBound=${maxPrice}`;
    navigate({
      pathname: "/courses/filter",
      search: query,
    });
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  return (
    <div>
      <div className="panel">
        <h3>Subject</h3>
        <label> Enter Subject</label>
        <input type="text" value={subject} onChange={handleChangeSubject} />
        <button onClick={handleSubmitSubject}>GO</button>
      </div>
      <div className="panel">
        <h3>Rating</h3>
        <label> 1</label>
        <input type="checkbox" value={1} onChange={handleChangeRating} />
        <label>2</label>
        <input type="checkbox" value={2} onChange={handleChangeRating} />
        <label>3</label>
        <input type="checkbox" value={3} onChange={handleChangeRating} />
        <label> 4</label>
        <input type="checkbox" value={4} onChange={handleChangeRating} />
        <label> 5</label>
        <input type="checkbox" value={5} onChange={handleChangeRating} />
      </div>
      <div className="panel">
        <h3>Price</h3>
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
        <label>FREEE</label>
        <input type="checkbox" value={0} onChange={handleChangePriceFree} />
        <button onClick={handlePrice}>GO</button>
      </div>
    </div>
  );
};

export default Filter;
