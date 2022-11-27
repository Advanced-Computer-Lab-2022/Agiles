import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
import Cookies from "universal-cookie"
import axios  from "axios";
import LoadingScreen from "react-loading-screen";
import spinner from "../static/download.gif"
import { useEffect, useState } from "react";
const URL = '/individualtrainee/getIndividualTraineebyId'
const CURL = '/corporate/getCorporateTraineebyId'
const ReviewCard = (props) => {
  const userId = props.userId;
  const rating = props.rating;
  const review = props.review;
  const [isloading, setIsLoading] = useState(false);
  const [user , setUser] = useState("");
  const fetchData = async()=>{
    setIsLoading(true);
      let config = {
        headers: {
          header1: "Access-Control-Allow-Origin",
        }}
      try{
        const response = await axios.get(URL,{params:{id:userId}},config);
        setUser(response.data)
      }
      catch(err)
      {
        console.log(err);
      }
     setIsLoading(false)
    
  
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <>{isloading ? (
      <LoadingScreen loading={true} logoSrc={spinner} />
    ) : (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <Rating
            name="rating"
            readOnly
            value={!rating ? 0 : rating}
          />
        </Card.Subtitle>
        <Card.Text>{review}</Card.Text>
      </Card.Body>
    </Card>)}</>
  );
};

export default ReviewCard;
