import "./Filter.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [minPrice, setMinPrice] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER);
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(5);
  let query = ""
  const handleChangeSubject = async (event) => {
    event.preventDefault();
    if (event.target.checked) {
      let value = event.target.value
      setSubject(value);
      console.log(subject);
      
      if(query == "")
        query = query + `subject=${value}`
      else
        query = query + `&subject=${value}`
      navigate({
        pathname: "/courses/filter",
        search: query,
      });
    } else {
      setSubject("");
      console.log("empty subject");
      query.replace(`?subject=${subject}`,"")
      query.replace(`subject=${subject}`,"")
      navigate({
        pathname: "/courses/filter",
        search: query,
      });
    }
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
      console.log(event.target.value);
      if(query == "")
        query = query + `rating=${rating}`
      else
      query = query + `&rating=${rating}`
      navigate({
        pathname: "/courses/filter",
        search: query,
      });
    } else {
      setRating(5);
      query.replace(`?rating=${rating}`,`rating=${5}`)
      query.replace(`rating=${rating}`,`rating=${5}`)
    }
  };
  const navigate = useNavigate();
  const handlePrice = async (event) => {
    event.preventDefault();
    if(query == "")
      query = query + `lowerBound=${minPrice}&upperBound=${maxPrice}`
    else
      query = query + `&lowerBound=${minPrice}&upperBound=${maxPrice}`
    navigate({
      pathname: "/courses/filter",
      search: query,
    });
  };

  const handleChangePriceFree = (event) => {
    if (event.target.checked) {
      setMinPrice(0);
      setMaxPrice(0);
    } else {
      setMaxPrice(Number.MAX_SAFE_INTEGER);
    }
  };

  return (
    <div>
      <div className="panel">
        <h3>Subject</h3>
        <label> wala 1</label>
        <input type="checkbox" value={"wala1"} onChange={handleChangeSubject} />
        <label> wala 2</label>
        <input type="checkbox" value={"wala2"} onChange={handleChangeSubject} />
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
          type="text"
          placeholder="MinPrice"
          onChange={handleChangePrice1}
        />
        <input
          type="text"
          placeholder="MaxPRice"
          onChange={handleChangePrice2}
        />
        <label>FREEE</label>
        <input type="checkbox" value={0} onChange={handleChangePriceFree} />
        <button onClick={handlePrice}>GOO</button>
      </div>
    </div>
  );
};

export default Filter;
