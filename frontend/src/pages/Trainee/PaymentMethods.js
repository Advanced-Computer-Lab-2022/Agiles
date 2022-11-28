import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from './Profile.module.css'
import { useState } from "react";
const PaymentMethods = () => {
  const [isloading, setIsLoading] = useState(false);
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style['main']}>
           
        </section>
      )}
    </>
  );
};

export default PaymentMethods;
