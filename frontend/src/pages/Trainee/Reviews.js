import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
const cookie = new Cookies();
const fetchInstUrl = "/instructor/instructorbyid";

const Reviews = () => {
    const id = cookie.get("currentUser");
    const fetchData = async()=>{
        try{
           const res = await axios.get(fetchInstUrl,{ params: { id: id } });
        }
        catch(e){

        }
    }
    useEffect(()=>{
        fetchData()},[]);
    return (  <></>);
}
 
export default Reviews;