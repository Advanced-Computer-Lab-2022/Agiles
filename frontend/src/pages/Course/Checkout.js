import style from "./Checkout.module.css";
import Accordion from "react-bootstrap/Accordion";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff";
import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import {useLocation,Link, useNavigate} from "react-router-dom";
import Cookie from "universal-cookie";
import Swal from "sweetalert2";
const cookie = new Cookie();
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";
const completeUrl = "/individualtrainee/pay";

const Checkout = () => {
  const [isloading, setIsLoading] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [rows, setRows] = useState([]);
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [saved,setSaved]=useState(true);
  const [Credit,setCredit] = useState(true);
  const id = cookie.get("currentUser");
  const location = useLocation();
  const price =  new URLSearchParams(location.search).get("price");
  const courseId =  new URLSearchParams(location.search).get("cid");
  const discount =  new URLSearchParams(location.search).get("discount");
  const navigate = useNavigate();
  const validateDate = (e) => {
    e.target.value = e.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        "0$1/" // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        "$1/" // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        "0$1/$2" // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        "$1/$2" // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        "0" // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        "" // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        "/" // Prevent entering more than 1 `/`
      );
    setCardExpiryDate(e.target.value);
  };
  const validateNumber = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setCardNumber(result);
  };
  const validateCVV = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    setCVV(result);
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchUrl, { params: { id: id } });
      setRows(res.data.creditCard);
    } catch (err) {    }
    setIsLoading(false);
  };
  const handleComplete = async()=>{
    const create = saved && Credit;
    if (Credit){
        if (!cardName || !cardNumber || !cardExpiryDate || !CVV){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
              })
            return;
        }
        else if (cardNumber.length !== 16){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid card number!'});
                return;
            }
        else if (cardExpiryDate.length !== 5 || cardExpiryDate.slice(0,2)<12 || cardExpiryDate.slice(3,5)<22){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid expiry date!'});
                return;
            }
        else if (CVV.length !== 3){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid CVV!'});
                return;
    }
}
    const body={
        courseId : courseId,
        create : create,
        cardName:cardName,
        cardNumber : cardNumber,
        cardExpiryDate :cardExpiryDate,
        CVV : CVV
    }
    try{
        const res = await axios.post(completeUrl,body);
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'congratulations!! payment completed'
          })
          navigate("/mylearning");
    }
    catch(err){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Server error!",
          });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
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
              <form>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0" >
                  <Accordion.Header>
                  <input type='radio' id ='new' name='card' defaultChecked={true} onChange={()=>setCredit(!Credit)} className={style['radio']}></input>
                    <CreditCardIcon />
                    <label className={style["header"]}>
                      {" "}
                      Credit/Debit Card
                    </label>{" "}
                  </Accordion.Header>
                  <Accordion.Body>
                    <form className={style["form"]}>
                      <label>Name on Card</label>
                      <input
                        required
                        type="text"
                        placeholder={`Name on card`}
                        autoComplete="off"
                        onChange={(e) => setCardName(e.target.value)}
                      ></input>
                      <label>Card number</label>
                      <input
                        required
                        type="text"
                        name="card-num"
                        placeholder="0000 0000 0000 0000"
                        size="18"
                        id="cr_no"
                        minLength={"16"}
                        maxLength={"16"}
                        value={cardNumber}
                        onChange={validateNumber}
                      ></input>
                      <label>CVV/CVC</label>
                      <input
                        required
                        type="password"
                        name="cvv"
                        placeholder="000"
                        size="1"
                        minLength={"3"}
                        maxLength="3"
                        value={CVV}
                        onChange={validateCVV}
                      ></input>
                      <label>ExpiryDate</label>
                      <input
                        required
                        ttype="text"
                        name="exp"
                        placeholder="MM/YY"
                        size="6"
                        id="exp"
                        minLength="5"
                        maxLength="5"
                        onChange={validateDate}
                      ></input>
                    </form>
                    <div>
                      {" "}
                      <Form.Check
                        type={"checkbox"}
                        label="Securely save this card for my later purchase"
                        defaultChecked={true}
                        onChange = {()=>setSaved(!saved)}
                      />
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" >
                  <Accordion.Header>    
                    <DataSaverOffIcon />{" "}
                    <label className={style["header"]}>
                      {" "}
                      Your saved payments
                    </label>
                  </Accordion.Header>
                  <Accordion.Body>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>card Number</TableCell>
                            <TableCell align="right">Name on Card</TableCell>
                            <TableCell align="right">Expires on</TableCell>
                            <TableCell align="right">check</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                **** **** **** {row.cardNumber.slice(11, 15)}
                              </TableCell>
                              <TableCell align="right">
                                {row.cardName}
                              </TableCell>
                              <TableCell align="right">
                                {row.cardExpiryDate}
                              </TableCell>
                              <TableCell align="right">  <input type='radio' id={`old+${index}`} name='card' onChange={()=>setCredit(!Credit)} className={style['radio']}></input> </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              </form>
            </section>
          </section>
          <section className={style["right"]}>
            <div className={style['container']}>
          <h2>Summary</h2>
          <div className={style['formating']}>
          <label className={style['label1']}>Original Price: </label>
          <label> {price} USD</label>
          </div >
          {discount>0&&<div className={style['formating']}>
            <label className={style['label1']}>Discount: </label>
            <label>{discount}%</label>
           </div>}
          <hr className={style['hr']}></hr>
          <div className={style['formating']}>
          <label className={style['label1']}>Total: </label>
          <label>{price-price*discount/100} USD</label>
          </div>
          <label className={style['end']}>By completing your purchase you agree to these <Link to='user/terms'>Terms of Service</Link></label>
          <button on onClick={handleComplete}>Complete Checkout</button>
          <span>30-Day Money-Back Guarantee</span>
          </div>
          </section>
          
        </section>
      )}
    </>
  );
};

export default Checkout;
