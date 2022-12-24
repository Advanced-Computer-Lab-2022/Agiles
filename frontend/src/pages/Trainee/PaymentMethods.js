import LoadingScreen from "react-loading-screen";
import spinner from "../../static/download.gif";
import style from "./Profile.module.css";
import { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSidebar";
import Cookie from "universal-cookie";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
const cookie = new Cookie();
const fetchUrl = "/individualtrainee/getIndividualTraineebyId";
const deleteUrl = "/individualtrainee/deleteCredit";
const createUrl = "/individualtrainee/createCredit";
const PaymentMethods = () => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const [rows, setRows] = useState([]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const id = cookie.get("currentUser");
  const handleDelete = async (e) => {
    const id = e.target.id;
    try {
      const res = await axios.delete(deleteUrl + "/" + id);
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Server error!",
      });
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const card = {
      cardName: cardName,
      cardNumber: cardNumber,
      cardExpiryDate: cardExpiryDate,
      CVV: CVV,
    };
    try {
      const res = await axios.post(createUrl, card);
      e.target.reset();
      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Server error!",
      });
    }
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(fetchUrl, { params: { id: id } });
      setData(res.data);
      setRows(res.data.creditCard);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
  return (
    <>
      {isloading ? (
        <LoadingScreen loading={true} logoSrc={spinner} />
      ) : (
        <section className={style["main"]}>
          <ProfileSideBar
            fullname={data.firstname + " " + data.lastname}
            state={"payment"}
          />
          <section className={style["payment"]}>
            <section className={style["payment-top"]}>
              <div>
                <h1>Payment Methods</h1>
                <label>
                  Edit your payment methods and add/delete your credit cards
                  here.
                </label>
              </div>
            </section>

            <section className={style["payment-bottom"]}>
              <label>Your saved payments :</label>
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
                      <TableCell align="right">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          **** **** **** {row.cardNumber.slice(11, 15)}
                        </TableCell>
                        <TableCell align="right">{row.cardName}</TableCell>
                        <TableCell align="right">
                          {row.cardExpiryDate}
                        </TableCell>
                        <TableCell align="right">
                          <ClearIcon
                            onClick={handleDelete}
                            id={row._id}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
            <section className={style["payment-bottom"]}>
              <label>Add Credit/Debit Card :</label>
              <form onSubmit={handleCreate}>
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
                <Button
                  style={{ backgroundColor: "#a00407", border: "none" }}
                  variant="dark"
                  type="submit"
                >
                  {" "}
                  ADD
                </Button>
              </form>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

export default PaymentMethods;
