import style from "./Checkout.module.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const [isloading, setIsLoading] = useState(false);
  const location = useLocation();
  const price = location.state.price;
  const discount = location.state.discount;
  const courseId = new URLSearchParams(location.search).get("cid");
  const [selected, setSelected] = useState("creditcard");
  const navigate = useNavigate();

  const handleComplete = async () => {
       if (selected === "creditcard") {
         try {
        const res = await axios.post(
          "/individualtrainee/create-checkout-session",
          { courseId: courseId }
        );
        const url = res.data.url;
        window.location.href = url;
      } catch (e) {
        console.log(e);
      }
       }
      else if (selected === "wallet") {

        }

  };

  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main"]}>
          <section className={style["left"]}>
            <h1>Checkout</h1>
            <section className={style["payment-method"]}>
              <h2>Payment method</h2>
              <div className={style["payment-method-container"]}>
                <ListGroup>
                  <ListGroup.Item className={style["listGroup"]}>
                    <input
                      type="radio"
                      id="creditCard"
                      name="wallet"
                      defaultChecked={true}
                      onChange={() => setSelected("creditcard")}
                      className={style["radio"]}
                    ></input>
                    <CreditCardIcon />
                    <label className={style["header"]}>
                      Credit/Debit Card
                    </label>
                  </ListGroup.Item>
                  <ListGroup.Item  className={style["listGroup"]}>
                    <input
                      type="radio"
                      id="wallet"
                      name="wallet"
                      onChange={() => setSelected("wallet")}
                      defaultChecked={false}
                      className={style["radio"]}
                    ></input>
                    <DataSaverOffIcon />
                    <label className={style["header"]}> Wallet</label>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </section>
          </section>
          <section className={style["right"]}>
            <div className={style["container"]}>
              <h2>Summary</h2>
              <div className={style["formating"]}>
                <label className={style["label1"]}>Original Price: </label>
                <label> {price} USD</label>
              </div>
              {discount > 0 && (
                <div className={style["formating"]}>
                  <label className={style["label1"]}>Discount: </label>
                  <label>{discount}%</label>
                </div>
              )}
              <hr className={style["hr"]}></hr>
              <div className={style["formating"]}>
                <label className={style["label1"]}>Total: </label>
                <label>{price - (price * discount) / 100} USD</label>
              </div>
              <label className={style["end"]}>
                By completing your purchase you agree to these{" "}
                <Link to="/user/terms">Terms of Service</Link>
              </label>
              <button onClick={handleComplete}>Proceed</button>
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </section>
        </section>
      )}
    </>
  );
};

export default Checkout;
