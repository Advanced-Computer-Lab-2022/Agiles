import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Promotion() {
  const [promotion, setPromotion] = useState(0);
  const [enddate, setEnddate] = useState("");
  const [change, setChange] = useState(false);
  const location = useLocation();
  const courseId = location.state.course_id;

  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`/course/addPromotion?id=${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ promo: promotion, enddate: enddate }),
      });
      setChange(!change);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>Add a Promotion</div>
      <div>
        <span>Amount (%) </span>
        <input
          required
          type="number"
          value={promotion}
          onChange={handlePromo}
        ></input>
      </div>
      <div>
        <span>End Date </span>

        <input
          required
          type="date"
          value={enddate}
          onChange={handleEnddate}
        ></input>
      </div>
      <button type="submit">submit</button>
    </form>
  );
}

export default Promotion;
