import { useLocation } from "react-router-dom";
import style from "./PreviewProfile.module.css";
import { useEffect,useState } from "react";
import axios from "axios";
const fetchInstUrl = "/instructor/instructorbyid"
const PreviewProfile = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const [data, setData] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [minibio, setMiniBio] = useState("");
    const [review, setReviews] = useState(0);
    const [sCount, setSCount] = useState(0);
    const fetchData = async () => {
        try {
          const res = await axios.get(fetchInstUrl, { params: { id: id } });
            setFirstname(res.data.firstField.firstname);
            setLastname(res.data.firstField.lastname);
            setMiniBio(res.data.firstField.mini_bio);
            setReviews(res.data.secondField.length);
            setSCount(res.res.data.firstField.studentCount);
         
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
    return ( <section className={style['main']}>
        <section className={style['left']}>
         <label>INSTRUCTOR</label>
         <h1>{firstname.toUpperCase()} {lastname.toUpperCase()}</h1>
         <div className={style['left-top']}>
            <div> <label>Total students</label>
            <h5></h5></div>
           <div> <label>Reviews</label>
            <h5>{review}</h5></div>
           
         </div>
         <h4>About me</h4>
         <p>{minibio}</p>
        </section>
        <section className={style['right']}>

        </section>
        
    </section>);
}
 
export default PreviewProfile;