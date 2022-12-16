import { useLocation } from "react-router-dom";
import style from "./PreviewProfile.module.css";
import { useEffect,useState } from "react";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import axios from "axios";
const fetchInstUrl = "/instructor/instructorbyid"
const PreviewProfile = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const [data, setData] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [minibio, setMiniBio] = useState("");
    const [review, setReviews] = useState(0);
    const [sCount, setSCount] = useState(0);
    const fetchData = async () => {
      setIsLoading(true);
        try {
          const res = await axios.get(fetchInstUrl, { params: { id: id } });
            setFirstname(res.data.firstField.firstname);
            setData(res.data.firstField);
            setLastname(res.data.firstField.lastname);
            setMiniBio(res.data.firstField.mini_bio);
            setReviews(res.data.secondField.length);
            setSCount(res.data.firstField.studentCount);
           
        } catch (err) {
          console.log(err);
        }
        setIsLoading(false);
      };
      useEffect(() => {
        fetchData();
      }, []);
    return (
      <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
       <section className={style['main']}>
        <section className={style['left']}>
         <label>INSTRUCTOR</label>
         <h1>{firstname.toUpperCase()} {lastname.toUpperCase()}</h1>
         <div className={style['left-top']}>
            <div> <label>Total students</label>
            <h5>{sCount}</h5></div>
           <div> <label>Reviews</label>
            <h5>{review}</h5></div>
           
         </div>
         <h4>About me</h4>
         <p>{minibio}</p>
        </section>
        <section className={style['right']}>
              <img src={data.imgUrl} alt="instructor"></img>
              <div> <button>Send Message</button></div>
             
        </section>
        
    </section>)}</>);
}
 
export default PreviewProfile;