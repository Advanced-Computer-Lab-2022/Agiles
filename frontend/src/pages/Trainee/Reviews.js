import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import style from "../Instructor/PreviewProfile.module.css";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import ReviewCard from "../../components/ReviewCard";
import Rating from "@mui/material/Rating";
const cookie = new Cookies();
const fetchInstUrl = "/instructor/instructorbyid";

const Reviews = () => {
  const id = cookie.get("currentUser");
  const [reviews, setReviews] = useState([]);
  const [data, setData] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchInstUrl, { params: { id: id } });
      setReviews(res.data.secondField);
      setData(res.data.firstField);
    } catch (e) {
      console.log(e);
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
        <section className={style["mainReview"]}>
          <h1>My Reviews</h1>
          <div style={{marginLeft:'2%'}}>
            <div style={{ textAlign: "center" ,display:'flex' }}>
              <label style={{ fontWeight: "bold" , marginRight:"10px"}}>
                Rating :
              </label>
              <h5>
                <Rating
                  name="rating"
                  readOnly
                  value={
                    data?.rating /
                    (data.ratingCount == 0 ? 1 : data.ratingCount)
                  }
                />
              </h5>
            </div>
            <div style={{ textAlign: "center",display:'flex',marginBottom: "30px" }}>
            <label style={{ fontWeight: "bold"}}>{reviews.length} reviews</label>
            </div>
          </div>
          <div style={{ marginLeft: "3%" }}>
            {reviews.map((review, index) => (
              <ReviewCard
                index={index}
                username={review.userId.username}
                rating={review.userRating}
                review={review.userReview}
              ></ReviewCard>
            ))}
            {reviews.length === 0 && (
              <h5 style={{ fontWeight: "bold" }}>No reviews yet</h5>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Reviews;
