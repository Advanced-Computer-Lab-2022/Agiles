import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from './Profile.module.css'
import { useState,useEffect } from "react";
import ProfileSideBar from "./ProfileSidebar";
import Cookie from "universal-cookie";
import axios from "axios";
const cookie = new Cookie();
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";

const PaymentMethods = () => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const id = cookie.get("currentUser");
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchUrl, { params: { id: id } });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(()=>{
      fetchData();
  },[])
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style['main']}>
            <ProfileSideBar fullname ={data.firstname + " "+data.lastname} state={'payment'}/>
        </section>
      )}
    </>
  );
};

export default PaymentMethods;
