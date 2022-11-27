import style from "../../components/CoursePreview.module.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const PROMO_URL = "/course/addPromotion";
const CoursePromo = (props) => {
  const course_id = props.course_id;
  const [promotion, setPromotion] = useState();
  const [enddate, setEnddate] = useState("");
  const [alert,setAlert] = useState("");
  const [flag,setFlag] = useState(false);
  const handlePromo = (e) => {
    setPromotion(e.target.value);
  };
  const handleEnddate = (e) => {
    setEnddate(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: course_id,
      promo: promotion,
      enddate: enddate,
    };
    try {
      const res = await axios.patch(PROMO_URL, data);
      setAlert("success")
      setFlag(true);
    } catch (e) {
      setAlert("danger")
      setFlag(false);
    }
    setPromotion('amount..');
    setEnddate("");
  };
  return (
    <div className={style["mainRight"]}>
      <label className={style["mainlabel"]}>Course Promotion</label>
      <form onSubmit={handleSubmit} style={{display : 'grid' ,maxWidth:'50%' , gap:'2rem' , marginTop :'2rem'}}>
        <div>

        {flag &&<Alert key={alert} variant={alert}>
             {alert == 'success' ? "promotion updated successfully" :"error happened"}
        </Alert>}
          <span>Amount (%) </span>
          <input
            required
            type="number"
            value={promotion}
            placeholder= "amount.."
            style = {{border:'0.5px solid black',borderRadius:'0.25rem' , marginLeft:'0.5rem',padding:'0.5rem',width:'10rem'}}
            onChange={handlePromo}
          />
        </div>
        <div>
          <span>End Date </span>
          <input
            required
            type="date"
            value={enddate}
            style = {{border:'0.5px solid black',borderRadius:'0.25rem' , marginLeft:'1.7rem',padding:'0.5rem' ,width:'10rem'}}
            onChange={handleEnddate}
          ></input>
        </div>
        <Button variant="primary" type="submit" style={{width:'17rem'}}>Sumbit
          </Button>
      </form>
    </div>
  );
};

export default CoursePromo;
